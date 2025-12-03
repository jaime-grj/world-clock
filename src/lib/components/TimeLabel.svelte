<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { getTimeForTZ } from '$lib/utils/timezones';

	export let label: string;
	export let flag = '🏳️';
	export let timezone: string;
	export let x = 0;
	export let y = 0;

	const dispatch = createEventDispatcher<{ addFavorite: string }>();
	const initialTime = getTimeForTZ(new Date(), timezone);
	let timeElement: HTMLSpanElement | null = null;

	onMount(() => {
		const update = () => {
			if (timeElement) {
				timeElement.textContent = getTimeForTZ(new Date(), timezone);
			}
		};
		update();
		const interval = setInterval(update, 1000);
		return () => clearInterval(interval);
	});

	function handleFavorite() {
		dispatch('addFavorite', timezone);
	}
</script>

<button
	class="time-label"
	style={`transform: translate(-50%, -50%); left: ${x}px; top: ${y}px;`}
	on:click|stopPropagation={handleFavorite}
	aria-label={`Añadir ${label} (${timezone}) a favoritos`}
>
	<span class="heading">
		<span class="flag" aria-hidden="true">{flag}</span>
		<span class="country">{label}</span>
	</span>
	<span class="time" bind:this={timeElement}>{initialTime}</span>
	<span class="timezone">{timezone}</span>
</button>

<style>
	.time-label {
		position: absolute;
		border: 1px solid #0f172a33;
		border-radius: 4px;
		padding: 0.3rem 0.45rem;
		background: rgba(15, 23, 42, 0.72);
		color: #f8fafc;
		font-size: 0.7rem;
		line-height: 1.2;
		display: flex;
		flex-direction: column;
		gap: 0.12rem;
		min-width: 110px;
		cursor: pointer;
		transition: transform 120ms ease, box-shadow 120ms ease;
		box-shadow: 0 1px 4px rgba(15, 23, 42, 0.35);
		text-align: left;
	}

	.time-label:hover,
	.time-label:focus-visible {
		transform: translate(-50%, -50%) scale(1.04);
		box-shadow: 0 4px 12px rgba(15, 23, 42, 0.45);
		outline: none;
	}

	.heading {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-weight: 600;
	}

	.flag {
		font-size: 1rem;
		line-height: 1;
	}

	.country {
		font-size: 0.82rem;
	}

	.time {
		font-variant-numeric: tabular-nums;
		font-size: 0.95rem;
		font-family: 'JetBrains Mono', 'SFMono-Regular', ui-monospace, 'Cascadia Code', monospace;
	}

	.timezone {
		font-size: 0.62rem;
		opacity: 0.85;
		font-family: 'JetBrains Mono', 'SFMono-Regular', ui-monospace, 'Cascadia Code', monospace;
	}
</style>
