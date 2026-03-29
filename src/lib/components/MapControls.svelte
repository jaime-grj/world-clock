<script lang="ts">
  import FavoriteList from '$lib/components/FavoriteList.svelte';
  import { preferences } from '$lib/stores/preferences';

  export let zoomIn: () => void;
  export let zoomOut: () => void;
  export let resetZoom: () => void;
  export let sliderValue: number;
  export let showAllTimezones: boolean;

  let showFavorites = false;
  let showConfig = false;

  function handleToggleTheme() {
    preferences.toggleTheme();
  }

  function handleToggleFavorites() {
    showFavorites = !showFavorites;
    showConfig = false;
  }

  function handleToggleConfig() {
    showConfig = !showConfig;
    showFavorites = false;
  }
</script>

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
      on:input
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
  <button type="button" on:click={handleToggleTheme} aria-label="Alternar tema">
    {$preferences.theme === 'light' ? '🌙' : '☀️'}
  </button>
  <button type="button" class:active={showFavorites} on:click={handleToggleFavorites} aria-label="Favoritos">
    ⭐
  </button>
  <button type="button" class:active={showConfig} on:click={handleToggleConfig} aria-label="Configuración">
    ⚙️
  </button>
  {#if showFavorites}
    <div class="favorites-wrapper">
      <FavoriteList />
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

<style>
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