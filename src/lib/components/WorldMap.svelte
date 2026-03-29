<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { feature } from 'topojson-client';
  import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
  import type { Topology } from 'topojson-specification';
  import world from '$lib/data/world-100m.json';
  import { getCountryTimezones, normalizeCountryName } from '$lib/data/countryTimezones.js';
  import tzLookup from 'tz-lookup';
  import TimeLabel from '$lib/components/TimeLabel.svelte';
  import MapControls from '$lib/components/MapControls.svelte';
  import { getFlagEmoji } from '$lib/utils/countryFlags';
  import { preferences, type FavoriteZone } from '$lib/components/preferences';

  type LabelPoint = {
    id: string;
    label: string;
    timezone: string;
    x: number;
    y: number;
    country: string;
    flag: string;
    flagName?: string;
  };

  type RenderLabel = LabelPoint & {
    source: 'favorite' | 'hover';
    targetX: number;
    targetY: number;
  };

  type CountryFeature = Feature<Geometry, { name: string }>;

  const ASPECT_RATIO = 0.56;
  const MIN_HEIGHT = 380;
  const MAX_VIEWPORT_RATIO = 0.8;
  const TILE_OFFSETS = [0, -1, 1] as const;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 128;

  const LAND_COLOR = 'var(--map-land)';
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
  let hoverTimeout: ReturnType<typeof setTimeout> | null = null;
  let pointerOverLabel = false;
  let tileWidth = 0;
  let initialLoadDone = false;
  let showAllTimezones = false;
  let sliderValue = 0;

  let initialScale = 1;
  let initialTranslate: [number, number] = [0, 0];
  let lastRenderedTransform: d3.ZoomTransform = d3.zoomIdentity;
  let baseTileWidth = 0;
  let d3Path: any = null;
  let d3Projection: any = null;
  let forceWorker: Worker | null = null;
  let currentArrangeId = 0;

  function highlightCountry(country: string) {
    cancelHoverClear();
    if (hoveredCountry && hoveredCountry !== country && svgSelection) {
      svgSelection.selectAll(`path[data-country="${hoveredCountry.replace(/"/g, '\\"')}"]`).attr('fill', LAND_COLOR);
    }
    hoveredCountry = country;
    if (svgSelection) {
      svgSelection.selectAll(`path[data-country="${hoveredCountry.replace(/"/g, '\\"')}"]`).attr('fill', HIGHLIGHT_COLOR);
    }
  }

  function addFavoriteZone(country: string, timezone: string, flagName?: string) {
    preferences.addFavorite({ country, timezone, flagName });
  }

  function scaleToSlider(k: number) {
    return (Math.log(k / MIN_ZOOM) / Math.log(MAX_ZOOM / MIN_ZOOM)) * 100;
  }

  function sliderToScale(val: number) {
    return MIN_ZOOM * Math.pow(MAX_ZOOM / MIN_ZOOM, val / 100);
  }

  $: hoveredLabels = hoveredCountry
    ? labelAnchors
        .filter((label) => label.country === hoveredCountry)
        .map((label) => {
          const [tx, ty] = currentTransform.apply([label.x, label.y]);
          return { ...label, x: tx, y: ty, targetX: tx, targetY: ty, source: 'hover' } satisfies RenderLabel;
        })
    : [];

  $: favoriteLabels = labelAnchors
    .filter((label) => $preferences.favorites.some((fav) => fav.timezone === label.timezone && fav.country === label.country))
    .map((label) => {
      const [tx, ty] = currentTransform.apply([label.x, label.y]);
      return { ...label, x: tx, y: ty, targetX: tx, targetY: ty, source: 'favorite' } satisfies RenderLabel;
    });

  $: allLabels = showAllTimezones
    ? labelAnchors.map((label) => {
        const [tx, ty] = currentTransform.apply([label.x, label.y]);
        return { ...label, x: tx, y: ty, targetX: tx, targetY: ty, source: 'hover' } satisfies RenderLabel;
      })
    : [];

  $: rawLabels = showAllTimezones ? allLabels : mergeLabels(favoriteLabels, hoveredLabels);

  let arrangedLabels: RenderLabel[] = [];
  let lastLabelIds = '';
  let arrangeTimeout: ReturnType<typeof setTimeout> | null = null;
  let lastArrangedScale = 0;

  function runForceWorker(newRaw: RenderLabel[]) {
    if (!forceWorker) return;
    currentArrangeId++;
    const currentMap = new Map(arrangedLabels.map((a) => [a.id, a]));
    const nodes = newRaw.map((r) => {
      const current = currentMap.get(r.id);
      return { ...r, x: current ? current.x : r.x, y: current ? current.y : r.y };
    });
    forceWorker.postMessage({ id: currentArrangeId, nodes });
  }

  $: updateArrangedLabels(rawLabels);

  function updateArrangedLabels(newRaw: RenderLabel[]) {
    if (!newRaw || newRaw.length === 0) {
      arrangedLabels = [];
      lastLabelIds = '';
      if (arrangeTimeout) clearTimeout(arrangeTimeout);
      return;
    }

    const currentIds = newRaw.map((l) => l.id).join(',');

    // If the amount or origin of items changed (e.g. toggled "show all", or hovered a new country)
    // we re-run immediately, avoiding visual snap-backs by passing the existing simulated points.
    if (currentIds !== lastLabelIds) {
      if (arrangeTimeout) clearTimeout(arrangeTimeout);
      lastLabelIds = currentIds;
      lastArrangedScale = currentTransform.k;
      runForceWorker(newRaw);
      return;
    }

    // During panning and zooming, we fast-track visual updates by mapping math deltas
    // instead of executing the extremely heavy D3 quadtree collision function.
    const rawMap = new Map(newRaw.map((r) => [r.id, r]));
    arrangedLabels = arrangedLabels.map((label) => {
      const raw = rawMap.get(label.id);
      if (!raw) return label;
      const dx = raw.targetX - label.targetX;
      const dy = raw.targetY - label.targetY;
      return { ...raw, x: label.x + dx, y: label.y + dy };
    });

    if (arrangeTimeout) {
      clearTimeout(arrangeTimeout);
    }

    // If we only panned (scale is unchanged), no need to re-run the layout simulation
    if (lastArrangedScale === currentTransform.k) {
      return;
    }

    // Let the heavy simulation settle in after interactions finish (Debouncer)
    arrangeTimeout = setTimeout(() => {
      runForceWorker(newRaw);
      lastArrangedScale = currentTransform.k;
    }, 150);
  }

  onMount(() => {
    initialLoadDone = true;

    forceWorker = new Worker(new URL('../components/forceWorker.ts', import.meta.url), { type: 'module' });
    forceWorker.onmessage = (e) => {
      if (e.data.id === currentArrangeId) {
        arrangedLabels = e.data.nodes;
      }
    };
    if (rawLabels.length > 0) {
      runForceWorker(rawLabels);
    }

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      const { width: nextWidth, height: nextHeight } = entries[0].contentRect;
      if (!nextWidth) return;
      const resolvedHeight = calculateHeight(nextWidth, nextHeight);
      if (Math.abs(nextWidth - width) > 1 || Math.abs(resolvedHeight - height) > 1) {
        width = nextWidth;
        height = resolvedHeight;
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          drawMap();
        }, 150);
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
      if (forceWorker) {
        forceWorker.terminate();
      }
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

    d3Projection = projection;
    const path = d3.geoPath().projection(projection);
    d3Path = path;

    initialScale = projection.scale();
    initialTranslate = projection.translate() as [number, number];

    const bounds = path.bounds(featureCollection);
    baseTileWidth = bounds[1][0] - bounds[0][0];
    tileWidth = baseTileWidth;

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

    const tilesGroup = mapGroup.append('g').attr('class', 'map-tiles');

    TILE_OFFSETS.forEach((offset) => {
      const tileGroup = tilesGroup.append('g').attr('data-offset', offset).attr('transform', `translate(${offset * baseTileWidth},0)`);

      tileGroup
        .append('g')
        .selectAll('path')
        .data(countries)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('data-country', (d: CountryFeature) => normalizeCountryName(d.properties.name))
        .attr('fill', LAND_COLOR)
        .attr('stroke', STROKE_COLOR)
        .attr('stroke-width', 0.5)
        .attr('vector-effect', 'non-scaling-stroke')
        .on('mouseover', (event: MouseEvent, d: CountryFeature) => {
          highlightCountry(normalizeCountryName(d.properties.name));
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
          let zones = getCountryTimezones(countryName);
          if (!zones.length) {
            zones = buildFallbackZone(d, countryName);
          }
          const first = zones[0];
          if (first) {
          addFavoriteZone(countryName, first.timezone, (first as any).flagName);
          }
        });
    });

    const seenLabelIds = new Set<string>();
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
        .map((zone: any) => {
          const labelId = `${countryName}-${zone.id}`;
          if (seenLabelIds.has(labelId)) {
            return null;
          }
          seenLabelIds.add(labelId);

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
            id: labelId,
            label: zone.label,
            timezone: zone.timezone,
            x: projected[0],
            y: projected[1],
            country: countryName,
            flag: zone.flag || getFlagEmoji(zone.flagName || countryName),
            flagName: zone.flagName
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
      .scaleExtent([MIN_ZOOM, MAX_ZOOM])
      .translateExtent([[-extentPadding, -height], [width + extentPadding, height * 2]])
      .on('zoom', (event) => {
        applyZoomTransform(event.transform);
      })
      .on('end', (event) => {
        updateSemanticZoom(event.transform);
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

    updateSemanticZoom(currentTransform);
    applyZoomTransform(currentTransform);
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

  function handleSliderChange(e: Event) {
    if (!svgSelection || !zoomBehavior) return;
    const val = parseFloat((e.target as HTMLInputElement).value);
    const targetScale = sliderToScale(val);
    zoomBehavior.scaleTo(svgSelection, targetScale);
  }

  function handleLabelEnter(country: string) {
    pointerOverLabel = true;
    highlightCountry(country);
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
    if (hoveredCountry && svgSelection) {
      svgSelection.selectAll(`path[data-country="${hoveredCountry.replace(/"/g, '\\"')}"]`).attr('fill', LAND_COLOR);
    }
    hoveredCountry = null;
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
    const g = mapGroup;
    if (!g) {
      return;
    }

    currentTransform = transform;
    sliderValue = scaleToSlider(transform.k);

    const scale = transform.k / lastRenderedTransform.k;
    const deltaX = transform.x - scale * lastRenderedTransform.x;
    const deltaY = transform.y - scale * lastRenderedTransform.y;

    g.attr('transform', `translate(${deltaX}, ${deltaY}) scale(${scale})`);
  }

  function updateSemanticZoom(transform: d3.ZoomTransform) {
    const g = mapGroup;
    if (!g || !d3Projection || !d3Path) return;

    lastRenderedTransform = transform;

    g.attr('transform', null);
    d3Projection
      .scale(initialScale * transform.k)
      .translate([
        initialTranslate[0] * transform.k + transform.x,
        initialTranslate[1] * transform.k + transform.y
      ]);

    g.selectAll('path').attr('d', d3Path as any);

    TILE_OFFSETS.forEach((offset) => {
      g
        .select(`g[data-offset="${offset}"]`)
        .attr('transform', `translate(${offset * baseTileWidth * transform.k},0)`);
    });
  }

  function mergeLabels(primary: RenderLabel[], secondary: RenderLabel[]) {
    const seen = new Set<string>();
    const result: RenderLabel[] = [];
    for (const list of [primary, secondary]) {
      for (const label of list) {
        const key = label.id;
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
      console.debug('buildFallbackZone timezone obtained:', {
        originalCountryName: country.properties.name,
        normalizedCountryName: normalizedName,
        centroid,
        lon,
        lat,
        timezone
      });
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

<div class="map-shell" bind:this={containerEl} data-theme={$preferences.theme}>
  <div class="map-wrapper" style={`height:${height}px`}>
    <svg bind:this={svgContainer} class="main-map"></svg>
    <svg class="overlay-layer">
      <g>
        {#each arrangedLabels as label (label.id)}
          <g>
            <line 
              x1={label.targetX} 
              y1={label.targetY} 
              x2={label.x} 
              y2={label.y} 
              stroke="var(--map-water)" 
              stroke-width="5" 
              stroke-linecap="round"
            />
            <line 
              x1={label.targetX} 
              y1={label.targetY} 
              x2={label.x} 
              y2={label.y} 
              stroke="var(--map-highlight)" 
              stroke-width="2" 
              stroke-dasharray="5 3"
              stroke-linecap="round"
            />
            <circle cx={label.targetX} cy={label.targetY} r="5" fill="var(--map-water)" />
            <circle cx={label.targetX} cy={label.targetY} r="3" fill="var(--map-highlight)" />
          </g>
        {/each}
      </g>
    </svg>
    <div class="labels-layer" aria-hidden="false">
      {#each arrangedLabels as label (label.id)}
        <TimeLabel
          label={label.label}
          flag={label.flag}
          timezone={label.timezone}
          x={label.x}
          y={label.y}
          on:addFavorite={() => addFavoriteZone(label.country, label.timezone, label.flagName)}
          on:mouseenter={() => handleLabelEnter(label.country)}
          on:mouseleave={handleLabelLeave}
        />
      {/each}
    </div>
    <MapControls 
      {zoomIn} 
      {zoomOut} 
      {resetZoom} 
      {sliderValue} 
      bind:showAllTimezones 
      on:input={handleSliderChange} 
    />
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

  .main-map {
    border-radius: 0;
    box-shadow: 0 0 18px rgba(15, 23, 42, 0.15);
    display: block;
    background-color: var(--map-water);
  }

  .overlay-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: visible;
  }

  .labels-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
  }

  .labels-layer :global(.time-label) {
    pointer-events: auto;
  }
</style>
