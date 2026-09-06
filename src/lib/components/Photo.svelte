<script>
	// Image with a graceful fallback: if the real photo file is missing (404),
	// it swaps to an on-palette placeholder so the layout never shows a broken icon.
	let { src, fallback = '/images/placeholder.svg', alt = '', class: klass = '', ...rest } = $props();

	let current = $state(src);

	function onError(e) {
		if (current !== fallback) {
			current = fallback;
		} else {
			// Fallback also failed — stop retrying to avoid a loop.
			e.currentTarget.onerror = null;
		}
	}
</script>

<img src={current} {alt} class={klass} onerror={onError} {...rest} />
