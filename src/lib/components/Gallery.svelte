<script>
	import { Expand } from '@lucide/svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { gallery } from '$lib/site.js';
	import Photo from './Photo.svelte';
	import Lightbox from './Lightbox.svelte';

	let open = $state(false);
	let index = $state(0);

	function view(i) {
		index = i;
		open = true;
	}
</script>

<section id="gallery" class="py-24 md:py-32">
	<div class="mx-auto max-w-editorial px-6 md:px-10">
		<div data-reveal use:reveal class="mb-14 text-center md:mb-20">
			<p class="eyebrow">Moments</p>
			<h2 class="mt-5 text-4xl font-light text-charcoal sm:text-5xl">The Gallery</h2>
			<span class="mx-auto mt-8 block rule-gold"></span>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
			{#each gallery as image, i}
				<button
					type="button"
					onclick={() => view(i)}
					data-reveal
					use:reveal={{ delay: i * 120 }}
					class="group relative aspect-[3/4] w-full overflow-hidden border border-gold/30
						{i === 1 ? 'md:mt-16' : ''} {i === 2 ? 'md:mt-8' : ''}"
					aria-label={`View photo ${i + 1}: ${image.alt}`}
				>
					<Photo
						src={image.src}
						alt={image.alt}
						loading="lazy"
						class="h-full w-full object-cover transition-transform duration-[1.2s] ease-lux group-hover:scale-105"
					/>
					<!-- Hover overlay + view icon -->
					<span
						class="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0
							transition-all duration-500 ease-lux group-hover:bg-ink/30 group-hover:opacity-100
							group-focus-visible:bg-ink/30 group-focus-visible:opacity-100"
						aria-hidden="true"
					>
						<span class="grid h-14 w-14 place-items-center rounded-full border border-ivory/70 text-ivory">
							<Expand size={22} strokeWidth={1.5} />
						</span>
					</span>
				</button>
			{/each}
		</div>
	</div>
</section>

<Lightbox images={gallery} bind:open bind:index />
