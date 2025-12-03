<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { getTimeForTZ } from '$lib/utils/timezones';

	export let label: string;
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
	<span class="label">{label}</span>
	<span class="time" bind:this={timeElement}>{initialTime}</span>
	<span class="timezone">{timezone}</span>
</button>

<style>
	.time-label {
		position: absolute;
		border: 1px solid #0f172a33;
		border-radius: 6px;
		padding: 0.35rem 0.6rem;
		background: rgba(15, 23, 42, 0.75);
		color: #f8fafc;
		font-size: 0.75rem;
		line-height: 1.2;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		min-width: 120px;
		cursor: pointer;
		transition: transform 120ms ease, box-shadow 120ms ease;
		box-shadow: 0 2px 6px rgba(15, 23, 42, 0.35);
		text-align: left;
	}

	.time-label:hover,
	.time-label:focus-visible {
		transform: translate(-50%, -50%) scale(1.04);
		box-shadow: 0 4px 12px rgba(15, 23, 42, 0.45);
		outline: none;
	}

	.label {
		font-weight: 600;
	}

	.time {
		font-variant-numeric: tabular-nums;
		font-size: 0.9rem;
	}

	.timezone {
		font-size: 0.7rem;
		opacity: 0.85;
		font-family: 'JetBrains Mono', 'SFMono-Regular', ui-monospace, 'Cascadia Code', monospace;
	}
</style>
