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

<section class="hero">
  <div class="hero-top">
    <button class="theme-toggle" type="button" on:click={toggleTheme} aria-label="Cambiar tema">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  </div>
</section>

<div class="layout">
  <div class="map-panel">
    <WorldMap {theme} on:addFavorite={(event) => addFavorite(event.detail)} />
    <div class="favorites-drawer">
      <FavoriteList {favorites} on:removeFavorite={(event) => removeFavorite(event.detail)} />
    </div>
  </div>
</div>

<style>
  :global(body) {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    margin: 0;
    background: var(--page-bg);
    color: var(--text-color);
    transition: background 200ms ease, color 200ms ease;
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

  .hero {
    margin: 0 auto 2.5rem;
    max-width: 1200px;
    padding: 0 1.5rem;
  }

  .hero-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  header {
    max-width: 780px;
  }

  .hero-title {
    margin: 0 0 0.5rem;
    font-size: clamp(2rem, 4vw, 3.2rem);
  }

  .hero p {
    margin: 0;
    color: var(--muted-color);
    font-size: 1.05rem;
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

  .layout {
    margin: 0 auto 3rem;
    max-width: 1400px;
    padding: 0 1.5rem;
  }

  .map-panel {
    position: relative;
    border: 1px solid var(--panel-border);
    background: var(--panel-bg);
    padding: 1.5rem;
    min-height: clamp(460px, 72vh, 820px);
  }

  @media (min-width: 1025px) {
    .map-panel {
      padding: 1.5rem;
      padding-right: clamp(320px, 28%, 380px);
    }
  }

  .map-panel :global(.map-shell) {
    width: 100%;
  }

  .favorites-drawer {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: min(320px, 28%);
    z-index: 5;
  }

  @media (max-width: 1024px) {
    .favorites-drawer {
      position: static;
      width: 100%;
      margin-top: 1.5rem;
    }
  }
</style>