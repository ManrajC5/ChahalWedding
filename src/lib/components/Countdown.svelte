<script>
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { wedding } from '$lib/site.js';

	const target = new Date(wedding.dateISO).getTime();

	let days = $state(0);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);
	let arrived = $state(false);

	function tick() {
		const diff = target - Date.now();
		if (diff <= 0) {
			// Wedding reached — clamp to zero, never show negatives.
			days = hours = minutes = seconds = 0;
			arrived = true;
			return;
		}
		days = Math.floor(diff / 86_400_000);
		hours = Math.floor((diff % 86_400_000) / 3_600_000);
		minutes = Math.floor((diff % 3_600_000) / 60_000);
		seconds = Math.floor((diff % 60_000) / 1000);
	}

	onMount(() => {
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});

	// Pad hours/minutes/seconds to two digits.
	const pad = (n) => String(n).padStart(2, '0');

	let units = $derived([
		{ value: String(days), label: days === 1 ? 'Day' : 'Days' },
		{ value: pad(hours), label: 'Hours' },
		{ value: pad(minutes), label: 'Minutes' },
		{ value: pad(seconds), label: 'Seconds' }
	]);
</script>

<section id="countdown" class="py-24 md:py-32">
	<div class="mx-auto max-w-editorial px-6 text-center md:px-10">
		<div data-reveal use:reveal>
			<p class="eyebrow">Counting Down</p>
			<h2 class="mx-auto mt-5 max-w-2xl text-3xl font-light text-charcoal sm:text-4xl md:text-5xl">
				Until we say <span class="italic text-wine">I do</span>
			</h2>
			<span class="mx-auto mt-8 block rule-gold"></span>
		</div>

		{#if arrived}
			<p
				data-reveal
				use:reveal
				class="mt-14 font-serif text-4xl uppercase tracking-wide2 text-wine sm:text-5xl"
			>
				The Day Has Arrived
			</p>
		{:else}
			<div
				data-reveal
				use:reveal={{ delay: 120 }}
				class="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
				role="timer"
				aria-live="off"
				aria-label="Time remaining until the wedding"
			>
				{#each units as unit}
					<div class="flex flex-col items-center border border-gold/30 px-2 py-6">
						<div class="relative flex h-20 items-center justify-center sm:h-28">
							{#key unit.value}
								<span
									class="font-serif text-5xl font-light tabular-nums text-charcoal
										motion-safe:animate-flip-in sm:text-7xl"
								>
									{unit.value}
								</span>
							{/key}
						</div>
						<span class="mt-3 font-sans text-[0.7rem] uppercase tracking-label text-forest/70">
							{unit.label}
						</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
