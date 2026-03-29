<script lang="ts">
  import { slide } from 'svelte/transition';
  import { getTimeForTZ, getUTCOffset } from '$lib/utils/timezones';
  import { getCountryTimezones } from '$lib/data/countryTimezones.js';
  import { getFlagEmoji } from '$lib/utils/countryFlags';
  import { currentTime } from '$lib/components/time';
  import { preferences, type FavoriteZone } from '$lib/components/preferences';

  $: favorites = $preferences.favorites;

  function remove(fav: FavoriteZone) {
    preferences.removeFavorite(fav);
  }

  $: favoriteDetails = favorites.map((fav) => {
    const zones = getCountryTimezones(fav.country);
    const match = zones.find((z) => z.timezone === fav.timezone);
    return {
      original: fav,
      country: fav.country,
      tz: fav.timezone,
      label: match ? match.label : fav.country,
      flagName: fav.flagName
    };
  });
</script>

<section class="favorites">
  <div class="header">
    <h2>⭐ Favoritos</h2>
    <p>{favorites.length} {favorites.length === 1 ? 'zona' : 'zonas'}</p>
  </div>

  <div class="favorites-body">
    {#if favorites.length === 0}
      <p class="empty">Haz clic en una etiqueta del mapa para guardarla aquí.</p>
    {:else}
      <ul>
        {#each favoriteDetails as favorite (`${favorite.country}-${favorite.tz}`)}
          <li transition:slide|local={{ duration: 200 }}>
            <div>
              <span class="fav-heading">
                <span class="fav-flag">{getFlagEmoji(favorite.flagName || favorite.country)}</span>
                <strong>{favorite.label}</strong>
              </span>
              <span class="fav-tz">{favorite.tz} &bull; {getUTCOffset($currentTime, favorite.tz)}</span>
              <span>{getTimeForTZ($currentTime, favorite.tz)}</span>
            </div>
            <button on:click={() => remove(favorite.original)} aria-label={`Quitar ${favorite.label} de favoritos`}>
              ✕
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</section>

<style>
  .favorites {
    border: 1px solid var(--favorite-border);
    border-radius: 0;
    padding: 1rem;
    background: var(--favorite-card-bg);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.15);
    min-width: 240px;
    color: var(--text-color);
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.25rem;
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--favorite-chip-bg);
    border: 1px solid var(--favorite-chip-border);
    padding: 0.55rem 0.85rem;
    border-radius: 0;
    gap: 0.75rem;
  }

  li div {
    display: flex;
    flex-direction: column;
    font-size: 0.85rem;
    gap: 0.15rem;
  }

  .fav-heading {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.95rem;
  }

  .fav-flag {
    font-size: 1.1rem;
  }

  .fav-tz {
    font-family: 'JetBrains Mono', 'SFMono-Regular', ui-monospace, 'Cascadia Code', monospace;
    font-size: 0.72rem;
    color: var(--muted-color);
  }

  strong {
    font-size: 0.95rem;
  }

  button {
    border: none;
    border-radius: 0;
    background: var(--accent);
    color: #f8fafc;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: grid;
    place-items: center;
    font-size: 0.85rem;
    transition: opacity 120ms ease;
  }

  button:hover,
  button:focus-visible {
    opacity: 0.8;
    outline: none;
  }

  .empty {
    margin: 0.5rem 0 0;
    color: var(--muted-color);
    font-size: 0.9rem;
  }

  .favorites-body {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .favorites-body ul {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding-right: 0.25rem;
  }
</style>