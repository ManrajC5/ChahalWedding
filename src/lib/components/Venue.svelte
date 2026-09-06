<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { venue } from '$lib/site.js';
	import Photo from './Photo.svelte';
</script>

<section id="venue" class="py-24 md:py-32">
	<div class="mx-auto grid max-w-editorial items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-10">
		<!-- Photograph. Drop the real file at /static/images/venue.jpg and it
		     replaces the placeholder automatically — no code change needed. -->
		<figure data-reveal use:reveal class="md:order-2">
			<div class="relative">
				<div class="overflow-hidden border border-wine/25">
					<Photo
						src={venue.image}
						alt={venue.imageAlt}
						loading="lazy"
						class="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-lux hover:scale-[1.03]"
					/>
				</div>
				<!-- Subtle offset frame accent -->
				<span
					class="pointer-events-none absolute -bottom-4 -left-4 hidden h-full w-full border border-wine/35 md:block"
					aria-hidden="true"
				></span>
			</div>
			<figcaption class="mt-4 font-sans text-xs uppercase tracking-wide2 text-taupe">
				{venue.imageCaption}
			</figcaption>
		</figure>

		<!-- Copy -->
		<div data-reveal use:reveal={{ delay: 150 }} class="md:order-1 md:pr-4">
			<p class="eyebrow">The Venue</p>
			<h2 class="mt-5 text-4xl font-light leading-tight text-charcoal sm:text-5xl">
				{venue.name}
			</h2>
			<p class="mt-4 font-sans text-sm leading-relaxed text-charcoal/60">
				{venue.address}
			</p>

			<div class="mt-8 space-y-6 font-sans text-base leading-relaxed text-charcoal/75">
				{#each venue.blurb as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>

			<div class="mt-10 flex items-center gap-4">
				<span class="rule-forest"></span>
				<span class="font-serif text-lg italic text-moss">More details to come</span>
			</div>
		</div>
	</div>
</section>
