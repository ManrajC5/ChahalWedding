<script>
	import { X, ChevronLeft, ChevronRight } from '@lucide/svelte';
	import Photo from './Photo.svelte';

	let {
		images = [],
		index = $bindable(0),
		open = $bindable(false)
	} = $props();

	let dialogEl = $state(null);
	const pad = (n) => String(n).padStart(2, '0');

	function close() {
		open = false;
	}
	function next() {
		index = (index + 1) % images.length;
	}
	function prev() {
		index = (index - 1 + images.length) % images.length;
	}

	function onKeydown(e) {
		if (!open) return;
		if (e.key === 'Escape') close();
		else if (e.key === 'ArrowRight') next();
		else if (e.key === 'ArrowLeft') prev();
	}

	// Lock page scroll and move focus into the dialog while it's open.
	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.style.overflow = open ? 'hidden' : '';
		if (open && dialogEl) dialogEl.focus();
		return () => (document.body.style.overflow = '');
	});
</script>

<svelte:window on:keydown={onKeydown} />

{#if open && images[index]}
	<div
		bind:this={dialogEl}
		tabindex="-1"
		role="dialog"
		aria-modal="true"
		aria-label="Photo viewer"
		class="fixed inset-0 z-[60] flex items-center justify-center p-4 outline-none
			motion-safe:animate-fade-in sm:p-8"
	>
		<!-- Backdrop as a real button so click-outside-to-close is keyboard accessible -->
		<button
			type="button"
			class="absolute inset-0 z-0 h-full w-full cursor-default bg-ink/95 backdrop-blur-sm"
			aria-label="Close photo viewer"
			onclick={close}
		></button>

		<!-- Counter -->
		<p class="pointer-events-none absolute left-1/2 top-6 z-10 -translate-x-1/2 font-sans text-xs tracking-label text-ivory/70">
			{pad(index + 1)} / {pad(images.length)}
		</p>

		<!-- Close -->
		<button
			type="button"
			class="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full text-ivory/80
				transition-colors duration-300 hover:bg-ivory/10 hover:text-ivory sm:right-6 sm:top-6"
			aria-label="Close photo viewer"
			onclick={close}
		>
			<X size={26} strokeWidth={1.5} />
		</button>

		<!-- Previous -->
		<button
			type="button"
			class="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full
				text-ivory/80 transition-colors duration-300 hover:bg-ivory/10 hover:text-ivory sm:left-6 sm:h-14 sm:w-14"
			aria-label="Previous photo"
			onclick={prev}
		>
			<ChevronLeft size={30} strokeWidth={1.5} />
		</button>

		<!-- Image -->
		<figure class="pointer-events-none relative z-10 max-h-full max-w-5xl">
			{#key index}
				<Photo
					src={images[index].src}
					alt={images[index].alt}
					class="mx-auto max-h-[82vh] w-auto max-w-full object-contain shadow-2xl motion-safe:animate-fade-up"
				/>
			{/key}
			{#if images[index].alt}
				<figcaption class="mt-4 text-center font-sans text-xs tracking-wide2 text-ivory/60">
					{images[index].alt}
				</figcaption>
			{/if}
		</figure>

		<!-- Next -->
		<button
			type="button"
			class="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full
				text-ivory/80 transition-colors duration-300 hover:bg-ivory/10 hover:text-ivory sm:right-6 sm:h-14 sm:w-14"
			aria-label="Next photo"
			onclick={next}
		>
			<ChevronRight size={30} strokeWidth={1.5} />
		</button>
	</div>
{/if}
