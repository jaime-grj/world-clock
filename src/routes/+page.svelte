<script lang="ts">
  import { onMount } from 'svelte';
  import WorldMap from '$lib/components/WorldMap.svelte';
  import FavoriteList from '$lib/components/FavoriteList.svelte';

  type Theme = 'light' | 'dark';

  let favorites: string[] = [];
  let theme: Theme = 'light';
  const FAVORITES_KEY = 'world-clock:favorites';
  let favoritesLoaded = false;

  function addFavorite(tz: string) {
    if (!favorites.includes(tz)) {
      favorites = [...favorites, tz];
    }
  }

  function removeFavorite(tz: string) {
    favorites = favorites.filter((f) => f !== tz);
  }

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
  }

  function applyTheme(next: Theme) {
    if (typeof document === 'undefined') return;
    document.body.dataset.theme = next;
  }

  onMount(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    theme = media.matches ? 'dark' : 'light';
    applyTheme(theme);
    try {
      const stored = window.localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          favorites = parsed.filter((item): item is string => typeof item === 'string');
        }
      }
    } catch (error) {
      console.warn('No se pudieron restaurar los favoritos', error);
    } finally {
      favoritesLoaded = true;
    }
    const listener = (event: MediaQueryListEvent) => {
      theme = event.matches ? 'dark' : 'light';
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  });

  $: applyTheme(theme);
  $: if (favoritesLoaded && typeof localStorage !== 'undefined') {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
</script>

<div class="fullscreen-map">
  <WorldMap {theme} {favorites} on:addFavorite={(event) => addFavorite(event.detail)} />
  <div class="ui-overlay">
    <button class="theme-toggle" type="button" on:click={toggleTheme} aria-label="Cambiar tema">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
    <FavoriteList {favorites} on:removeFavorite={(event) => removeFavorite(event.detail)} />
  </div>
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

  .ui-overlay {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
    width: min(220px, 22vw);
    z-index: 20;
  }

  .ui-overlay :global(.favorites) {
    max-height: min(55vh, 480px);
  }

  .theme-toggle {
    border: none;
    border-radius: 0;
    width: 48px;
    height: 48px;
    font-size: 1.35rem;
    background: var(--card-bg);
    color: var(--text-color);
    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.25);
    cursor: pointer;
    transition: transform 150ms ease, box-shadow 150ms ease;
  }

  .theme-toggle:hover,
  .theme-toggle:focus-visible {
    transform: translateY(-2px);
    outline: none;
    box-shadow: 0 12px 35px rgba(15, 23, 42, 0.35);
  }

  @media (max-width: 768px) {
    .ui-overlay {
      position: static;
      width: 100%;
      align-items: stretch;
      padding: 1rem;
      background: linear-gradient(180deg, rgba(2, 6, 23, 0.9), rgba(2, 6, 23, 0));
    }

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