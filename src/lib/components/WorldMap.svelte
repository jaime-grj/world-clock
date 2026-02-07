<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import * as d3 from 'd3';
  import { feature } from 'topojson-client';
  import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
  import type { Topology } from 'topojson-specification';
  import world from '$lib/data/world-100m.json';
  import { getCountryTimezones, normalizeCountryName } from '$lib/data/countryTimezones.js';
  import tzLookup from 'tz-lookup';
  import TimeLabel from '$lib/components/TimeLabel.svelte';
  import { getFlagEmoji } from '$lib/utils/countryFlags';

  type Theme = 'light' | 'dark';
  type LabelPoint = {
    id: string;
    label: string;
    timezone: string;
    x: number;
    y: number;
    country: string;
    flag: string;
  };

  type RenderLabel = LabelPoint & { source: 'favorite' | 'hover' };

  type CountryFeature = Feature<Geometry, { name: string }>;

  const dispatch = createEventDispatcher<{ addFavorite: string }>();

  const ASPECT_RATIO = 0.56;
  const MIN_HEIGHT = 380;
  const MAX_VIEWPORT_RATIO = 0.8;
  const TILE_OFFSETS = [0, -1, 1] as const;

  export let theme: Theme = 'light';
  export let favorites: string[] = [];

  const LAND_COLOR = 'var(--map-land)';
  const WATER_COLOR = 'var(--map-water)';
  const STROKE_COLOR = 'var(--map-stroke)';
  const HIGHLIGHT_COLOR = 'var(--map-highlight)';

  let width = 900;
  let height = 500;

  let svgContainer: SVGSVGElement;
  let containerEl: HTMLDivElement;
  let resizeObserver: ResizeObserver | null = null;
  let svgSelection: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
  let zoomBehavior: d3.ZoomBehavior<SVGSVGElement, unknown> | null = null;
  let mapGroup: d3.Selection<SVGGElement, unknown, null, undefined> | null = null;
  let labelAnchors: LabelPoint[] = [];
  let hoveredCountry: string | null = null;
  let currentTransform: d3.ZoomTransform = d3.zoomIdentity;
  let activePath: SVGPathElement | null = null;
  let hoverTimeout: ReturnType<typeof setTimeout> | null = null;
  let pointerOverLabel = false;
  let tileWidth = 0;

  $: hoveredLabels = hoveredCountry
    ? labelAnchors
        .filter((label) => label.country === hoveredCountry)
        .map((label) => {
          const [tx, ty] = currentTransform.apply([label.x, label.y]);
          return { ...label, x: tx, y: ty, source: 'hover' } satisfies RenderLabel;
        })
    : [];

  $: favoriteLabels = favorites
    .map((timezone) => labelAnchors.find((label) => label.timezone === timezone))
    .filter(Boolean)
    .map((entry) => {
      const label = entry as LabelPoint;
      const [tx, ty] = currentTransform.apply([label.x, label.y]);
      return { ...label, x: tx, y: ty, source: 'favorite' } satisfies RenderLabel;
    });

  $: displayedLabels = mergeLabels(favoriteLabels, hoveredLabels);

  onMount(() => {
    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      const { width: nextWidth, height: nextHeight } = entries[0].contentRect;
      if (!nextWidth) return;
      const resolvedHeight = calculateHeight(nextWidth, nextHeight);
      if (Math.abs(nextWidth - width) > 1 || Math.abs(resolvedHeight - height) > 1) {
        width = nextWidth;
        height = resolvedHeight;
        drawMap();
      }
    });

    resizeObserver = observer;

    if (containerEl) {
      observer.observe(containerEl);
      const initialWidth = containerEl.clientWidth;
      const initialHeight = containerEl.clientHeight;
      if (initialWidth) {
        width = initialWidth;
        height = calculateHeight(initialWidth, initialHeight);
      }
    }

    drawMap();

    return () => {
      observer.disconnect();
      resizeObserver = null;
    };
  });

  function drawMap() {
    const topology = world as unknown as Topology;
    const featureCollection = feature(
      topology,
      (topology.objects as Record<string, unknown>).countries as any
    ) as unknown as FeatureCollection<Geometry, { name: string }>;
    const countries = featureCollection.features;

    const projection = d3
      .geoMercator()
      .scale((width / (2 * Math.PI)) * 0.9)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    const bounds = path.bounds(featureCollection);
    tileWidth = bounds[1][0] - bounds[0][0];

    if (!svgContainer) {
      return;
    }

    const svg = d3
      .select(svgContainer)
      .attr('width', width)
      .attr('height', height);

    svgSelection = svg;
    svg.selectAll('*').remove();

    mapGroup = svg.append('g').attr('class', 'map-content');

    const waterWidth = tileWidth * TILE_OFFSETS.length || width;
    mapGroup
      .append('rect')
      .attr('x', -tileWidth || 0)
      .attr('width', waterWidth)
      .attr('height', height)
      .attr('fill', WATER_COLOR);

    const tilesGroup = mapGroup.append('g').attr('class', 'map-tiles');

    TILE_OFFSETS.forEach((offset) => {
      const tileGroup = tilesGroup.append('g').attr('transform', `translate(${offset * tileWidth},0)`);

      tileGroup
        .append('g')
        .selectAll('path')
        .data(countries)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', LAND_COLOR)
        .attr('stroke', STROKE_COLOR)
        .attr('stroke-width', 0.5)
        .on('mouseover', (event: MouseEvent, d: CountryFeature) => {
          cancelHoverClear();
          if (activePath && activePath !== event.currentTarget) {
            d3.select(activePath).attr('fill', LAND_COLOR);
          }
          hoveredCountry = normalizeCountryName(d.properties.name);
          activePath = event.currentTarget as SVGPathElement;
          d3.select(activePath).attr('fill', HIGHLIGHT_COLOR);
        })
        .on('mouseout', (event: MouseEvent) => {
          const next = event.relatedTarget as Element | null;
          if (next && next.closest('.time-label')) {
            cancelHoverClear();
            return;
          }
          scheduleHoverClear();
        })
        .on('click', (_event: MouseEvent, d: CountryFeature) => {
          const countryName = normalizeCountryName(d.properties.name);
          const [first] = getCountryTimezones(countryName);
          if (first) {
            dispatch('addFavorite', first.timezone);
          }
        });
    });

    const baseAnchors = countries.flatMap((country: CountryFeature) => {
      const mapName = country.properties.name;
      const countryName = normalizeCountryName(mapName);
      const definedZones = getCountryTimezones(countryName);
      const fallbackZones = definedZones.length ? definedZones : buildFallbackZone(country, countryName);
      if (!fallbackZones.length) {
        return [];
      }

      const centroid = path.centroid(country);

      return fallbackZones
        .map((zone) => {
          let projected: [number, number] | null = centroid;

          if (zone.coords) {
            const candidate = projection(zone.coords);
            if (candidate) {
              projected = candidate;
            }
          }

          if (!projected) {
            return null;
          }

          return {
            id: `${countryName}-${zone.id}`,
            label: zone.label,
            timezone: zone.timezone,
            x: projected[0],
            y: projected[1],
            country: countryName,
            flag: getFlagEmoji(countryName)
          } satisfies LabelPoint;
        })
        .filter(Boolean) as LabelPoint[];
    });

    labelAnchors = TILE_OFFSETS.flatMap((offset) =>
      baseAnchors.map((anchor) => ({
        ...anchor,
        id: offset === 0 ? anchor.id : `${anchor.id}-rep-${offset}`,
        x: anchor.x + offset * tileWidth
      }))
    );

    const horizontalExtent = tileWidth || width;
    const extentPadding = horizontalExtent * 2;

    zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .translateExtent([[-extentPadding, -height], [width + extentPadding, height * 2]])
      .on('zoom', (event) => {
        applyZoomTransform(event.transform);
      });

    svg.call(zoomBehavior).on('dblclick.zoom', null);
    svg.on('mouseleave', (event: MouseEvent) => {
      const next = event.relatedTarget as Element | null;
      if (pointerOverLabel || (next && next.closest('.labels-layer'))) {
        return;
      }
      cancelHoverClear();
      clearHover();
    });
  }

  function zoomIn() {
    if (!svgSelection || !zoomBehavior) {
      return;
    }
    svgSelection.transition().duration(200).call(zoomBehavior.scaleBy, 1.25);
  }

  function zoomOut() {
    if (!svgSelection || !zoomBehavior) {
      return;
    }
    svgSelection.transition().duration(200).call(zoomBehavior.scaleBy, 0.8);
  }

  function resetZoom() {
    if (!svgSelection || !zoomBehavior) {
      return;
    }
    svgSelection.transition().duration(200).call(zoomBehavior.transform, d3.zoomIdentity);
  }

  function handleLabelEnter(country: string) {
    pointerOverLabel = true;
    cancelHoverClear();
    hoveredCountry = country;
  }

  function handleLabelLeave(event: Event) {
    pointerOverLabel = false;
    const mouseEvent = event as MouseEvent;
    const next = mouseEvent.relatedTarget as Element | null;
    if (next && next.closest('.labels-layer')) {
      return;
    }
    if (!next || next.closest('.map-wrapper')) {
      scheduleHoverClear();
      return;
    }
    cancelHoverClear();
    clearHover();
  }

  function clearHover() {
    if (pointerOverLabel) {
      return;
    }
    hoveredCountry = null;
    if (activePath) {
      d3.select(activePath).attr('fill', LAND_COLOR);
      activePath = null;
    }
  }

  function scheduleHoverClear() {
    if (pointerOverLabel) {
      return;
    }
    cancelHoverClear();
    hoverTimeout = setTimeout(() => {
      clearHover();
      hoverTimeout = null;
    }, 180);
  }

  function cancelHoverClear() {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
  }

  function applyZoomTransform(transform: d3.ZoomTransform) {
    if (!mapGroup) {
      return;
    }

    currentTransform = transform;
    mapGroup.attr('transform', transform.toString());
  }

  function mergeLabels(primary: RenderLabel[], secondary: RenderLabel[]) {
    const seen = new Set<string>();
    const result: RenderLabel[] = [];
    for (const list of [primary, secondary]) {
      for (const label of list) {
        const key = `${label.country}-${label.timezone}`;
        if (seen.has(key)) {
          continue;
        }
        seen.add(key);
        result.push(label);
      }
    }
    return result;
  }

  function buildFallbackZone(country: CountryFeature, normalizedName: string) {
    const centroid = d3.geoCentroid(country);
    if (!centroid || centroid.some((value) => Number.isNaN(value))) {
      return [];
    }

    const [lon, lat] = centroid;
    try {
      const timezone = tzLookup(lat, lon);
      return [
        {
          id: 'auto',
          label: normalizedName,
          timezone,
          coords: [lon, lat] as [number, number],
          flag: getFlagEmoji(normalizedName)
        }
      ];
    } catch {
      return [];
    }
  }
  function calculateHeight(nextWidth: number, containerHeight?: number) {
    if (containerHeight && containerHeight > 0 && Number.isFinite(containerHeight)) {
      return Math.max(MIN_HEIGHT, containerHeight);
    }

    const byWidth = nextWidth * ASPECT_RATIO;
    if (typeof window === 'undefined') {
      return Math.max(MIN_HEIGHT, byWidth);
    }
    const viewportCap = window.innerHeight * MAX_VIEWPORT_RATIO;
    return Math.max(MIN_HEIGHT, Math.min(byWidth, viewportCap));
  }
</script>

<div class="map-shell" bind:this={containerEl} data-theme={theme}>
  <div class="map-wrapper" style={`height:${height}px`}>
    <svg bind:this={svgContainer}></svg>
    <div class="labels-layer" aria-hidden="false">
      {#each displayedLabels as label (label.id)}
        <TimeLabel
          label={label.label}
          flag={label.flag}
          timezone={label.timezone}
          x={label.x}
          y={label.y}
          on:addFavorite={(event) => dispatch('addFavorite', event.detail)}
          on:mouseenter={() => handleLabelEnter(label.country)}
          on:mouseleave={handleLabelLeave}
        />
      {/each}
    </div>
    <div class="controls">
      <button type="button" on:click={zoomIn} aria-label="Acercar">
        +
      </button>
      <button type="button" on:click={zoomOut} aria-label="Alejar">
        −
      </button>
      <button type="button" on:click={resetZoom} aria-label="Restablecer vista">
        ⟳
      </button>
    </div>
  </div>
</div>

<style>
  .map-shell {
    width: 100%;
  }

  .map-wrapper {
    position: relative;
    width: 100%;
    min-height: 360px;
  }

  svg {
    border-radius: 0;
    box-shadow: 0 0 18px rgba(15, 23, 42, 0.15);
    display: block;
  }

  .labels-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .labels-layer :global(.time-label) {
    pointer-events: auto;
  }

  .controls {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .controls button {
    border: none;
    border-radius: 0;
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--control-color);
    background: var(--control-bg);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
    cursor: pointer;
    transition: transform 120ms ease;
  }

  .controls button:hover,
  .controls button:focus-visible {
    transform: translateY(-1px);
    outline: none;
  }
</style>
