<script>
  import { getTimeForTZ } from '$lib/utils/timezones';
  import { onDestroy } from 'svelte';

  export let favorites = [];

  let now = new Date();
  const interval = setInterval(() => (now = new Date()), 1000);

  onDestroy(() => clearInterval(interval));

  function remove(tz) {
    dispatch('removeFavorite', tz);
  }

  let dispatch;
</script>

<h2>⭐ Favoritos</h2>

<ul>
  {#each favorites as tz}
    <li>
      <strong>{tz}:</strong> {getTimeForTZ(now, tz)}
      <button on:click={() => remove(tz)}>❌</button>
    </li>
  {/each}
</ul>