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
  import FavoriteList from '$lib/components/FavoriteList.svelte';
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
    flagName?: string;
  };

  type RenderLabel = LabelPoint & {
    source: 'favorite' | 'hover';
    targetX: number;
    targetY: number;
  };

  type CountryFeature = Feature<Geometry, { name: string }>;

  type FavoriteZone = {
    country: string;
    timezone: string;
    flagName?: string;
  };

  const dispatch = createEventDispatcher<{
    addFavorite: FavoriteZone;
    removeFavorite: FavoriteZone;
    toggleTheme: Theme;
  }>();

  const ASPECT_RATIO = 0.56;
  const MIN_HEIGHT = 380;
  const MAX_VIEWPORT_RATIO = 0.8;
  const TILE_OFFSETS = [0, -1, 1] as const;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 128;

  export let theme: Theme = 'light';
  export let favorites: FavoriteZone[] = [];

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
  let showFavorites = false;
  let showConfig = false;
  let initialLoadDone = false;
  let internalFavorites: FavoriteZone[] = [];
  let showAllTimezones = false;
  let sliderValue = 0;

  let initialScale = 1;
  let initialTranslate: [number, number] = [0, 0];
  let lastRenderedTransform: d3.ZoomTransform = d3.zoomIdentity;
  let baseTileWidth = 0;
  let d3Path: any = null;
  let d3Projection: any = null;

  function scaleToSlider(k: number) {
    return (Math.log(k / MIN_ZOOM) / Math.log(MAX_ZOOM / MIN_ZOOM)) * 100;
  }

  function sliderToScale(val: number) {
    return MIN_ZOOM * Math.pow(MAX_ZOOM / MIN_ZOOM, val / 100);
  }

  $: {
    if (initialLoadDone && typeof window !== 'undefined') {
      window.localStorage.setItem('world-clock-favorites', JSON.stringify(internalFavorites));
    }
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
    .filter((label) => internalFavorites.some((fav) => fav.timezone === label.timezone && fav.country === label.country))
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
      const currentMap = new Map(arrangedLabels.map((a) => [a.id, a]));
      arrangedLabels = arrangeLabels(
        newRaw.map((r) => {
          const current = currentMap.get(r.id);
          return { ...r, x: current ? current.x : r.x, y: current ? current.y : r.y };
        })
      );
      lastLabelIds = currentIds;
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

    // Let the heavy simulation settle in after interactions finish (Debouncer)
    arrangeTimeout = setTimeout(() => {
      const currentMap = new Map(arrangedLabels.map((a) => [a.id, a]));
      arrangedLabels = arrangeLabels(
        newRaw.map((r) => {
          const current = currentMap.get(r.id);
          return { ...r, x: current ? current.x : r.x, y: current ? current.y : r.y };
        })
      );
    }, 150);
  }

  function rectCollide() {
    let simNodes: any[];
    
    function force(alpha: number) {
      const quadtree = d3.quadtree(simNodes, (d: any) => d.x, (d: any) => d.y);
      // Dynamically lower precision iterations for large lists to prevent lagging 
      const iterations = simNodes.length > 300 ? 1 : (simNodes.length > 50 ? 2 : 4);
      
      for (let iter = 0; iter < iterations; ++iter) {
        for (let i = 0, n = simNodes.length; i < n; ++i) {
          const a = simNodes[i];
          const wa = (a.label.length * 10) + 60; 
          const ha = 48;
          const searchRadius = wa / 2 + 150;
          
          quadtree.visit((node: any, x1: number, y1: number, x2: number, y2: number) => {
            if (!node.length) {
              do {
                const b = node.data;
                if (b.index > a.index) {
                  const wb = (b.label.length * 8) + 60;
                  const hb = 48;

                  let dx = a.x - b.x;
                  let dy = a.y - b.y;
                  if (dx === 0 && dy === 0) {
                    dx = (Math.random() - 0.5) * 2;
                    dy = (Math.random() - 0.5) * 2;
                  }

                  const w = (wa + wb) / 2;
                  const h = (ha + hb) / 2;

                  if (Math.abs(dx) < w && Math.abs(dy) < h) {
                    const lx = (w - Math.abs(dx)) * (dx > 0 ? 1 : -1);
                    const ly = (h - Math.abs(dy)) * (dy > 0 ? 1 : -1);
                    const pushStrength = simNodes.length > 300 ? alpha * 1.5 : alpha * 0.8;

                    if (Math.abs(lx) < Math.abs(ly)) {
                      a.x += lx * pushStrength;
                      b.x -= lx * pushStrength;
                    } else {
                      a.y += ly * pushStrength;
                      b.y -= ly * pushStrength;
                    }
                  }
                }
              } while ((node = node.next));
            }
            return x1 > a.x + searchRadius || x2 < a.x - searchRadius || y1 > a.y + searchRadius || y2 < a.y - searchRadius;
          });
        }
      }
    }
    
    force.initialize = (initNodes: any[]) => { simNodes = initNodes; };
    return force;
  }

  function arrangeLabels(labels: RenderLabel[]): RenderLabel[] {
    if (!labels || labels.length === 0) return [];
    
    const nodes = labels.map((l) => ({ ...l }));
    
    const simulation = d3.forceSimulation(nodes as any)
      .force('x', d3.forceX((d: any) => d.targetX).strength(0.1))
      .force('y', d3.forceY((d: any) => d.targetY).strength(0.1))
      .force('collide', rectCollide())
      .stop();

    const ticks = nodes.length > 300 ? 15 : (nodes.length > 50 ? 60 : 250);
    for (let i = 0; i < ticks; ++i) simulation.tick();
    
    return nodes;
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = window.localStorage.getItem('world-clock-favorites');
      if (savedFavorites) {
        try {
          internalFavorites = JSON.parse(savedFavorites);
        } catch (e) {}
      } else {
        internalFavorites = favorites;
      }
    }
    initialLoadDone = true;

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
          cancelHoverClear();
          const countryName = normalizeCountryName(d.properties.name);
          if (hoveredCountry && hoveredCountry !== countryName && svgSelection) {
            svgSelection.selectAll(`path[data-country="${hoveredCountry.replace(/"/g, '\\"')}"]`).attr('fill', LAND_COLOR);
          }
          hoveredCountry = countryName;
          if (svgSelection) {
            svgSelection.selectAll(`path[data-country="${hoveredCountry.replace(/"/g, '\\"')}"]`).attr('fill', HIGHLIGHT_COLOR);
          }
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
            const isFav = internalFavorites.some((fav) => fav.timezone === first.timezone && fav.country === countryName);
            if (!isFav) {
              const newFav: FavoriteZone = { country: countryName, timezone: first.timezone, flagName: (first as any).flagName };
              internalFavorites = [...internalFavorites, newFav];
              dispatch('addFavorite', newFav);
            }
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
    cancelHoverClear();
    if (hoveredCountry && hoveredCountry !== country && svgSelection) {
      svgSelection.selectAll(`path[data-country="${hoveredCountry.replace(/"/g, '\\"')}"]`).attr('fill', LAND_COLOR);
    }
    hoveredCountry = country;
    if (svgSelection) {
      svgSelection.selectAll(`path[data-country="${hoveredCountry.replace(/"/g, '\\"')}"]`).attr('fill', HIGHLIGHT_COLOR);
    }
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

<div class="map-shell" bind:this={containerEl} data-theme={theme}>
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
          on:addFavorite={() => {
            const isFav = internalFavorites.some((fav) => fav.timezone === label.timezone && fav.country === label.country);
            if (!isFav) {
              const newFav: FavoriteZone = { country: label.country, timezone: label.timezone, flagName: label.flagName };
              internalFavorites = [...internalFavorites, newFav];
              dispatch('addFavorite', newFav);
            }
          }}
          on:mouseenter={() => handleLabelEnter(label.country)}
          on:mouseleave={handleLabelLeave}
        />
      {/each}
    </div>
    <div class="controls">
      <div class="zoom-group">
        <button type="button" on:click={zoomIn} aria-label="Acercar">
          +
        </button>
        <input 
          type="range" 
          class="zoom-slider" 
          min="0" 
          max="100" 
          step="0.1" 
          value={sliderValue} 
          on:input={handleSliderChange} 
          {...{ orient: 'vertical' }} 
          aria-label="Zoom" 
        />
        <button type="button" on:click={zoomOut} aria-label="Alejar">
          −
        </button>
      </div>
      <button type="button" on:click={resetZoom} aria-label="Restablecer vista">
        ⟳
      </button>
      <button type="button" on:click={() => {
        theme = theme === 'light' ? 'dark' : 'light';
        dispatch('toggleTheme', theme);
      }} aria-label="Alternar tema">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <button type="button" class:active={showFavorites} on:click={() => { showFavorites = !showFavorites; showConfig = false; }} aria-label="Favoritos">
        ⭐
      </button>
      <button type="button" class:active={showConfig} on:click={() => { showConfig = !showConfig; showFavorites = false; }} aria-label="Configuración">
        ⚙️
      </button>
      {#if showFavorites}
        <div class="favorites-wrapper">
          <FavoriteList favorites={internalFavorites} on:removeFavorite={(e) => {
            internalFavorites = internalFavorites.filter((fav) => !(fav.timezone === e.detail.timezone && fav.country === e.detail.country));
            dispatch('removeFavorite', e.detail);
          }} />
        </div>
      {/if}
      {#if showConfig}
        <div class="config-wrapper">
          <label class="config-toggle">
            <input type="checkbox" bind:checked={showAllTimezones} />
            Mostrar todas las zonas
          </label>
        </div>
      {/if}
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

  .controls {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    align-items: flex-end;
    z-index: 10;
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

  .zoom-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--control-bg);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
  }

  .zoom-group button {
    box-shadow: none;
  }

  .zoom-group button:hover,
  .zoom-group button:focus-visible {
    transform: none;
    opacity: 0.8;
  }

  .zoom-slider {
    appearance: slider-vertical;
    -webkit-appearance: slider-vertical;
    width: 40px;
    height: 100px;
    margin: 0;
    padding: 0.25rem 0;
    background: transparent;
    cursor: pointer;
  }

  .controls button.active {
    background: var(--accent);
    color: #fff;
  }

  .favorites-wrapper {
    margin-top: 0.5rem;
    height: 340px;
    max-height: calc(100vh - 120px);
  }

  .config-wrapper {
    margin-top: 0.5rem;
    background: var(--control-bg);
    color: var(--control-color);
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
    min-width: 200px;
  }

  .config-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.95rem;
  }
</style>
