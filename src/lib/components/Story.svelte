<script>
	import { reveal } from '$lib/actions/reveal.js';
	import Photo from './Photo.svelte';
</script>

<section id="story" class="py-24 md:py-32">
	<div class="mx-auto grid max-w-editorial items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-10">
		<!-- Photograph -->
		<figure data-reveal use:reveal class="relative">
			<div class="overflow-hidden">
				<Photo
					src="/images/ring-exchange.jpg"
					alt="Harwant placing the engagement ring on Janelle’s hand"
					loading="lazy"
					class="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-lux hover:scale-[1.03]"
				/>
			</div>
			<!-- Subtle offset frame accent -->
			<span
				class="pointer-events-none absolute -bottom-4 -right-4 hidden h-full w-full border border-forest/35 md:block"
				aria-hidden="true"
			></span>
		</figure>

		<!-- Copy -->
		<div data-reveal use:reveal={{ delay: 150 }} class="md:pl-4">
			<p class="eyebrow">Our Story</p>
			<h2 class="mt-5 text-4xl font-light leading-tight text-charcoal sm:text-5xl">
				Two paths, <span class="italic text-wine">one story</span>
			</h2>

			<div class="mt-8 space-y-6 font-sans text-base leading-relaxed text-charcoal/75">
				<!-- Placeholder copy — no facts invented. Edit freely in this component. -->
				<p>
					Every chapter brought them a little closer to this moment. Now, they are
					beginning the next one together.
				</p>
				<p>
					This is where your story belongs — the small beginnings, the moments that
					mattered, and the quiet decision to build a life side by side. Replace this
					placeholder with your own words whenever you're ready.
				</p>
			</div>

			<div class="mt-10 flex items-center gap-4">
				<span class="rule-forest"></span>
				<span class="font-serif text-lg italic text-moss">est. 2027</span>
			</div>
		</div>
	</div>
</section>
