<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { MapPin, ArrowUpRight } from '@lucide/svelte';
	import { location, wedding } from '$lib/site.js';
</script>

<!-- The green half of the scheme. On the white ground the colour lives in the
     rules, the ruled detail list and the outlined button — not in a fill. -->
<section id="location" class="py-24 md:py-32">
	<div class="mx-auto max-w-editorial px-6 md:px-10">
		<div data-reveal use:reveal class="mb-14 text-center md:mb-20">
			<p class="eyebrow text-forest">Where We're Celebrating</p>
			<h2 class="mt-5 font-serif text-4xl font-light text-charcoal sm:text-5xl md:text-6xl">
				{location.city}, <span class="italic text-forest">{location.region}</span>
			</h2>
			<p class="mt-4 font-sans text-xs uppercase tracking-label text-moss/80">
				{location.country}
			</p>
			<span class="mx-auto mt-8 block rule-forest"></span>
		</div>

		<div class="grid gap-14 md:grid-cols-2 md:gap-20">
			<!-- The city, in words -->
			<div data-reveal use:reveal={{ delay: 120 }} class="md:border-l-2 md:border-forest/40 md:pl-10">
				<div class="space-y-6 font-sans text-base leading-relaxed text-charcoal/75">
					{#each location.blurb as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>

				<a
					href={location.mapUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-outline-forest mt-10"
				>
					<MapPin size={15} strokeWidth={1.6} />
					{location.mapLabel}
					<ArrowUpRight size={15} strokeWidth={1.6} />
				</a>
			</div>

			<!-- Practical details -->
			<dl data-reveal use:reveal={{ delay: 240 }} class="border-t border-forest/25">
				<div class="border-b border-forest/20 py-6">
					<dt class="font-sans text-[0.7rem] uppercase tracking-label text-gold">Date</dt>
					<dd class="mt-2 font-serif text-2xl text-charcoal">{wedding.dateLong}</dd>
				</div>
				{#each location.details as item}
					<div class="border-b border-forest/20 py-6">
						<dt class="font-sans text-[0.7rem] uppercase tracking-label text-gold">
							{item.label}
						</dt>
						<dd class="mt-2 font-serif text-2xl leading-snug text-charcoal">{item.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>
