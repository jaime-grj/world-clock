<script lang="ts">
  import { preferences } from '$lib/components/preferences';
  import WorldMap from '$lib/components/WorldMap.svelte';

  $: if (typeof document !== 'undefined') document.body.dataset.theme = $preferences.theme;
</script>

<div class="fullscreen-map">
  <WorldMap />
</div>

<style>
  :global(body) {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    margin: 0;
    background: var(--page-bg);
    color: var(--text-color);
    transition: background 200ms ease, color 200ms ease;
    min-height: 100vh;
  }

  :global(body[data-theme='light']) {
    --page-bg: radial-gradient(circle at top, #e0f2fe, #f8fafc 55%);
    --text-color: #0f172a;
    --muted-color: #1e293b;
    --card-bg: #ffffff;
    --card-border: #e2e8f0;
    --card-subtle: #f8fafc;
    --accent: #0284c7;
    --label-bg: rgba(15, 23, 42, 0.84);
    --label-text: #f8fafc;
    --label-border: rgba(15, 23, 42, 0.25);
    --map-water: #dbeafe;
    --map-land: #c7d7ef;
    --map-stroke: #64748b;
    --map-highlight: #8bb8ff;
    --control-bg: rgba(255, 255, 255, 0.9);
    --control-color: #0f172a;
    --favorite-card-bg: #f8fafc;
    --favorite-border: #e2e8f0;
    --favorite-chip-bg: #ffffff;
    --favorite-chip-border: #dbeafe;
    --panel-bg: rgba(255, 255, 255, 0.78);
    --panel-border: rgba(15, 23, 42, 0.08);
  }

  :global(body[data-theme='dark']) {
    --page-bg: radial-gradient(circle at top, #0f172a, #020617 65%);
    --text-color: #e2e8f0;
    --muted-color: #cbd5f5;
    --card-bg: #0f172a;
    --card-border: #1f2937;
    --card-subtle: #111827;
    --accent: #38bdf8;
    --label-bg: rgba(15, 23, 42, 0.92);
    --label-text: #f8fafc;
    --label-border: rgba(148, 163, 184, 0.35);
    --map-water: #0f172a;
    --map-land: #1e293b;
    --map-stroke: #475569;
    --map-highlight: #38bdf8;
    --control-bg: rgba(15, 23, 42, 0.92);
    --control-color: #f8fafc;
    --favorite-card-bg: #111827;
    --favorite-border: #1f2937;
    --favorite-chip-bg: #0f172a;
    --favorite-chip-border: #1f2937;
    --panel-bg: rgba(2, 6, 23, 0.78);
    --panel-border: rgba(148, 163, 184, 0.15);
  }

  .fullscreen-map {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .fullscreen-map :global(.map-shell),
  .fullscreen-map :global(.map-wrapper) {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    .fullscreen-map {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .fullscreen-map :global(.map-shell) {
      flex: 1;
    }
  }
</style>