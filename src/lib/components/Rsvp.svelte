<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { ArrowRight } from '@lucide/svelte';
	import { rsvp, wedding, location, links } from '$lib/site.js';
	import Photo from './Photo.svelte';
</script>

<!-- The burgundy half of the scheme, set as a bordered invitation card on the
     same white ground as everything else. -->
<section id="rsvp" class="py-24 md:py-32">
	<div class="mx-auto max-w-editorial px-6 md:px-10">
		<div
			class="frame-wine grid items-center gap-12 px-6 py-14 sm:px-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-16 md:px-14 md:py-20"
		>
			<!-- Photograph. Drop the real file at /static/images/rsvp.jpg and it
			     replaces the placeholder automatically — no code change needed. -->
			<figure data-reveal use:reveal>
				<div class="relative">
					<div class="overflow-hidden border border-wine/25">
						<Photo
							src={rsvp.image}
							alt={rsvp.imageAlt}
							loading="lazy"
							class="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-lux hover:scale-[1.03]"
						/>
					</div>
					<!-- Offset frame accent, matching Our Story and The Venue -->
					<span
						class="pointer-events-none absolute -bottom-3 -right-3 hidden h-full w-full border border-gold/45 md:block"
						aria-hidden="true"
					></span>
				</div>
				<figcaption class="mt-4 font-sans text-[0.7rem] uppercase tracking-wide2 text-taupe">
					{rsvp.imageCaption}
				</figcaption>
			</figure>

			<!-- Copy -->
			<div data-reveal use:reveal={{ delay: 150 }}>
				<p class="eyebrow text-wine">RSVP</p>

				<h2 class="mt-5 font-serif text-4xl font-light leading-tight text-charcoal sm:text-5xl">
					Will you be <span class="italic text-wine">joining us?</span>
				</h2>

				<!-- Stacks on narrow screens: the rule looked stranded beside two
				     wrapped lines of the meta text. -->
				<div class="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
					<span class="rule-wine"></span>
					<p class="font-sans text-xs uppercase tracking-wide2 text-taupe">
						{wedding.dateLong} · {location.cityLine}
					</p>
				</div>

				<p class="mt-8 max-w-md font-sans text-base leading-relaxed text-charcoal/75">
					Let us know you'll be there — it takes a minute, and it means the world. Every
					answer helps us plan the day around the people in it.
				</p>

				<a href={links.rsvp} class="btn-wine mt-10">
					Yes — I'll be attending
					<ArrowRight size={15} strokeWidth={1.8} />
				</a>

				<p class="mt-6 font-sans text-[0.7rem] uppercase tracking-wide2 text-taupe">
					Kindly respond by {rsvp.deadline}
				</p>
			</div>
		</div>
	</div>
</section>
