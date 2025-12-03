<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<script>
  import WorldMap from '$lib/components/WorldMap.svelte';
  import FavoriteList from '$lib/components/FavoriteList.svelte';

  let favorites = [];

  function addFavorite(tz) {
    if (!favorites.includes(tz)) {
      favorites = [...favorites, tz];
    }
  }

  function removeFavorite(tz) {
    favorites = favorites.filter(f => f !== tz);
  }
</script>

<h1>🌍 Reloj Mundial</h1>

<div class="layout">
  <WorldMap on:addFavorite={(e) => addFavorite(e.detail)} />
  <FavoriteList {favorites} on:removeFavorite={(e) => removeFavorite(e.detail)} />
</div>

<style>
  .layout {
    display: flex;
    gap: 2rem;
  }
</style>