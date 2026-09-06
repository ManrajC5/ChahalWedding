/**
 * Svelte action: reveal an element on scroll using IntersectionObserver.
 * Adds the `is-visible` class once the element enters the viewport, then
 * stops observing so the animation only plays a single time.
 *
 * Respects `prefers-reduced-motion` by revealing immediately.
 *
 * Usage:  <div data-reveal use:reveal={{ delay: 120 }}>…</div>
 *
 * @param {HTMLElement} node
 * @param {{ delay?: number, threshold?: number }} [options]
 */
export function reveal(node, options = {}) {
	const prefersReduced =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (options.delay) {
		node.style.setProperty('--reveal-delay', `${options.delay}ms`);
	}

	// No IntersectionObserver (SSR / very old browsers) or reduced motion:
	// show content straight away rather than leaving it invisible.
	if (prefersReduced || typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-visible');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					observer.unobserve(node);
				}
			}
		},
		{ threshold: options.threshold ?? 0.15, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
