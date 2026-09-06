<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { couple, wedding, location } from '$lib/site.js';
</script>

<footer class="border-t border-gold/30 py-20 text-center md:py-24">
	<div data-reveal use:reveal class="mx-auto max-w-2xl px-6">
		<!-- Three-colour ornament: the whole scheme in one mark -->
		<span class="mx-auto flex w-fit items-center gap-3" aria-hidden="true">
			<span class="h-1.5 w-1.5 rotate-45 border border-forest/70"></span>
			<span class="h-1.5 w-1.5 rotate-45 border border-gold/80"></span>
			<span class="h-1.5 w-1.5 rotate-45 border border-wine/70"></span>
		</span>

		<p class="mt-8 font-serif text-4xl font-light text-charcoal sm:text-5xl">
			{couple.first} <span class="italic text-wine">&amp;</span> {couple.second}
		</p>
		<p class="mt-4 font-sans text-xs uppercase tracking-label text-gold">
			{wedding.dateLong}
		</p>
		<p class="mt-2 font-sans text-xs uppercase tracking-wide2 text-forest/70">
			{location.cityLine}
		</p>

		<p class="mx-auto mt-8 max-w-md font-serif text-lg italic text-charcoal/60">
			With love, we look forward to celebrating with you.
		</p>

		<span class="mx-auto mt-12 block rule-gold"></span>
		<p class="mt-8 font-sans text-[0.7rem] uppercase tracking-wide2 text-taupe">
			{couple.fullFirst} &amp; {couple.fullSecond}
		</p>
	</div>
</footer>
