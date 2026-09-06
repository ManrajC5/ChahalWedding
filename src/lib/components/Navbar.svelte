<script>
	import { Menu, X } from '@lucide/svelte';
	import { nav, couple, links } from '$lib/site.js';

	// `solid` forces the opaque treatment for pages that don't open on the dark
	// hero (e.g. /rsvp), where ivory-on-transparent would be invisible.
	let { solid = false } = $props();

	let open = $state(false);
	let scrolled = $state(false);

	function onScroll() {
		scrolled = window.scrollY > 40;
	}

	// Close the mobile menu after a link is chosen; smooth scroll is handled by CSS.
	function close() {
		open = false;
	}

	// Lock background scroll while the mobile menu is open.
	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.style.overflow = open ? 'hidden' : '';
		return () => (document.body.style.overflow = '');
	});
</script>

<svelte:window on:scroll={onScroll} />

<header
	class="fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-lux
		{solid || scrolled || open ? 'bg-white/90 shadow-[0_1px_0_theme(colors.gold/0.3)] backdrop-blur-md' : 'bg-transparent'}"
>
	<nav
		aria-label="Primary"
		class="mx-auto flex max-w-editorial items-center justify-between px-6 py-5 md:px-10"
	>
		<a
			href={links.home}
			class="font-serif text-xl tracking-wide2 transition-colors duration-500
				{solid || scrolled || open ? 'text-wine' : 'text-white'}"
		>
			{couple.monogram}
		</a>

		<!-- Desktop links -->
		<ul class="hidden items-center gap-9 md:flex">
			{#each nav as item}
				<li>
					<a
						href={item.href}
						class="group relative font-sans text-xs uppercase tracking-wide2 transition-colors duration-300
							{solid || scrolled ? 'text-charcoal/75 hover:text-wine' : 'text-white/85 hover:text-white'}"
					>
						{item.label}
						<span
							class="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 ease-lux group-hover:w-full"
						></span>
					</a>
				</li>
			{/each}
		</ul>

		<!-- Mobile toggle -->
		<button
			type="button"
			class="md:hidden {solid || scrolled || open ? 'text-wine' : 'text-white'}"
			aria-expanded={open}
			aria-controls="mobile-menu"
			aria-label={open ? 'Close menu' : 'Open menu'}
			onclick={() => (open = !open)}
		>
			{#if open}
				<X size={26} strokeWidth={1.5} />
			{:else}
				<Menu size={26} strokeWidth={1.5} />
			{/if}
		</button>
	</nav>

	<!-- Mobile menu: max-height accordion (reliable across browsers) -->
	<div
		id="mobile-menu"
		class="overflow-hidden transition-[max-height,opacity] duration-500 ease-lux md:hidden"
		style="max-height: {open ? '32rem' : '0'}; opacity: {open ? '1' : '0'};"
	>
		<ul class="flex flex-col gap-1 px-6 pb-8 pt-2">
			{#each nav as item, i}
				<li>
					<a
						href={item.href}
						onclick={close}
						class="block border-b border-gold/25 py-4 font-serif text-2xl text-charcoal
							transition-opacity duration-500 {open ? 'opacity-100' : 'opacity-0'}"
						style="transition-delay: {open ? 80 + i * 60 : 0}ms"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</header>
