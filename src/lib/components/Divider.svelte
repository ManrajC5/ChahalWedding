<script>
	/**
	 * Ornamental section divider: a hairline rule broken by a small diamond.
	 * With every section on the same white ground, these are what separate one
	 * band of content from the next — and where the accent colours live.
	 *
	 * Class strings are written out in full (not composed) so Tailwind's
	 * scanner can see them.
	 */
	/** @type {{ tone?: 'gold' | 'forest' | 'wine' }} */
	let { tone = 'gold' } = $props();

	const tones = {
		gold: { line: 'bg-gold/30', node: 'border-gold/70' },
		forest: { line: 'bg-forest/25', node: 'border-forest/60' },
		wine: { line: 'bg-wine/25', node: 'border-wine/60' }
	};

	const t = $derived(tones[tone] ?? tones.gold);
</script>

<div class="mx-auto max-w-editorial px-6 md:px-10" aria-hidden="true">
	<div class="flex items-center gap-5">
		<span class="h-px flex-1 {t.line}"></span>
		<span class="h-1.5 w-1.5 rotate-45 border {t.node}"></span>
		<span class="h-px flex-1 {t.line}"></span>
	</div>
</div>
