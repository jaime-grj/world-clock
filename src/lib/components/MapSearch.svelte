<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Fuse from 'fuse.js';
  import { currentTime } from '$lib/stores/time';
  import { getTimeForTZ, getUTCOffset } from '$lib/utils/timezones';

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

  export let labelAnchors: LabelPoint[] = [];

  const dispatch = createEventDispatcher<{ jump: LabelPoint }>();

  let searchQuery = '';
  let searchResults: LabelPoint[] = [];
  let showSearchResults = false;

  $: baseLabels = labelAnchors.filter((l) => !l.id.includes('-rep-'));

  $: fuse = new Fuse(baseLabels, {
    keys: [
      { name: 'country', weight: 2 },
      { name: 'label', weight: 1.5 },
      { name: 'timezone', weight: 1 }
    ],
    threshold: 0.3,
    ignoreLocation: true
  });

  $: {
    if (searchQuery.trim().length > 0) {
      searchResults = fuse.search(searchQuery).map(result => result.item).slice(0, 6);
      showSearchResults = true;
    } else {
      searchResults = [];
      showSearchResults = false;
    }
  }

  function handleSelect(result: LabelPoint) {
    dispatch('jump', result);
    searchQuery = '';
    showSearchResults = false;
  }
</script>

<div class="search-container">
  <input 
    type="text" 
    placeholder="Buscar país, ciudad o zona..." 
    bind:value={searchQuery}
    class="search-input"
  />
  {#if showSearchResults}
    <ul class="search-results">
      {#each searchResults as result (result.id)}
        <li>
          <button type="button" on:click={() => handleSelect(result)}>
            <div class="result-info">
              <span class="flag">{result.flag}</span>
              <span class="name">{result.timezone} <span class="country-name">({result.country})</span></span>
            </div>
            <div class="result-time">
              <span class="time">{getTimeForTZ($currentTime, result.timezone)}</span>
              <span class="offset">{getUTCOffset($currentTime, result.timezone)}</span>
            </div>
          </button>
        </li>
      {/each}
      {#if searchResults.length === 0}
        <li class="no-results">No se encontraron resultados</li>
      {/if}
    </ul>
  {/if}
</div>

<style>
  .search-container {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 10;
    width: 360px;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .search-input {
    width: 100%;
    padding: 0.6rem 1rem;
    font-size: 0.95rem;
    border: 1px solid var(--control-bg);
    border-radius: 4px;
    background: var(--control-bg);
    color: var(--control-color);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
    outline: none;
    transition: border-color 120ms ease;
  }
  .search-input:focus {
    border-color: var(--accent);
  }
  .search-results {
    list-style: none;
    margin: 0;
    padding: 0;
    background: var(--control-bg);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
    overflow: hidden;
  }
  .search-results li {
    border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  }
  .search-results li:last-child {
    border-bottom: none;
  }
  .search-results button {
    width: 100%;
    text-align: left;
    padding: 0.6rem 1rem;
    background: transparent;
    border: none;
    color: var(--control-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    font-size: 0.9rem;
    transition: background 120ms ease;
  }
  .search-results button:hover,
  .search-results button:focus-visible {
    background: var(--accent);
    color: #fff;
    outline: none;
  }
  .result-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    overflow: hidden;
  }
  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .result-time {
    text-align: right;
    font-family: 'JetBrains Mono', 'SFMono-Regular', ui-monospace, 'Cascadia Code', monospace;
    flex-shrink: 0;
  }
  .time {
    display: block;
    font-size: 0.9rem;
    font-variant-numeric: tabular-nums;
  }
  .search-results button:hover .country-name,
  .search-results button:focus-visible .country-name,
  .search-results button:hover .offset,
  .search-results button:focus-visible .offset {
    color: rgba(255, 255, 255, 0.8);
  }
  .country-name {
    font-size: 0.8rem;
    color: var(--muted-color);
  }
  .no-results {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    color: var(--muted-color);
  }
  .offset {
    font-size: 0.7rem;
    color: var(--muted-color);
    transition: color 120ms ease;
  }
</style>