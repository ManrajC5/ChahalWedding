<script>
	import { couple, wedding, location, photos } from '$lib/site.js';
	import Photo from './Photo.svelte';
</script>

<section
	id="home"
	class="relative flex min-h-[100svh] items-end justify-center overflow-hidden bg-ink"
>
	<!-- Cinematic background photo. Eager + high priority: it's above the fold.
	     The source is a tall portrait, so on wide screens `object-cover` crops it
	     hard. `object-position` is biased downward (50% 30%) so the crop keeps
	     their faces in the upper third of the frame instead of cutting off their
	     heads — and the copy below sits clear of them. -->
	<Photo
		src={photos.hero}
		fallback={photos.heroFallback}
		alt=""
		aria-hidden="true"
		fetchpriority="high"
		class="absolute inset-0 h-full w-full object-cover object-[50%_30%] animate-ken-burns motion-reduce:animate-none"
	/>

	<!-- Layered veil: dark at the very top (so the navbar reads), deliberately
	     light across the band where their faces sit, then deepening toward the
	     bottom so the typography stays legible. -->
	<div class="hero-veil absolute inset-0" aria-hidden="true"></div>

	<div class="relative z-10 mx-auto max-w-3xl px-6 pb-32 pt-28 text-center text-ivory md:pb-28">
		<h1 class="font-serif font-light leading-[0.95]">
			<span class="block text-6xl animate-fade-up [animation-delay:400ms] sm:text-7xl md:text-8xl">
				{couple.first}
			</span>
			<span
				class="my-2 block text-3xl font-extralight italic text-gold animate-fade-up [animation-delay:600ms] sm:text-4xl md:text-5xl"
			>
				&amp;
			</span>
			<span class="block text-6xl animate-fade-up [animation-delay:800ms] sm:text-7xl md:text-8xl">
				{couple.second}
			</span>
		</h1>

		<div class="mt-10 flex flex-col items-center gap-5 animate-fade-in [animation-delay:1100ms]">
			<span class="rule-gold"></span>
			<p class="font-sans text-sm uppercase tracking-label text-ivory/90">
				{wedding.dateLong}
			</p>
			<p class="font-sans text-xs uppercase tracking-wide2 text-ivory/70">
				{location.cityLine}
			</p>
			<p class="font-serif text-lg italic text-ivory/70">Together with their families</p>
		</div>
	</div>

	<!-- Subtle scroll indicator -->
	<a
		href="#countdown"
		aria-label="Scroll to countdown"
		class="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-fade-in [animation-delay:1500ms]"
	>
		<span class="flex flex-col items-center gap-2 text-ivory/70">
			<span class="font-sans text-[0.65rem] uppercase tracking-label">Scroll</span>
			<span class="relative block h-10 w-px overflow-hidden bg-ivory/25">
				<span
					class="absolute left-0 top-0 block h-4 w-px bg-gold motion-safe:animate-[scroll-line_2.2s_ease-in-out_infinite]"
				></span>
			</span>
		</span>
	</a>
</section>

<style>
	/* Uneven veil: heavier at the top and bottom edges, near-transparent through
	   the middle band so the couple's faces aren't dimmed. */
	.hero-veil {
		background: linear-gradient(
			to bottom,
			rgba(28, 24, 19, 0.6) 0%,
			rgba(28, 24, 19, 0.24) 18%,
			rgba(28, 24, 19, 0.2) 40%,
			rgba(28, 24, 19, 0.55) 62%,
			rgba(28, 24, 19, 0.88) 100%
		);
	}

	/* Local keyframe for the scroll indicator line traveling down the track. */
	@keyframes scroll-line {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(300%);
		}
	}
</style>
