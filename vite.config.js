import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Static adapter: the whole site prerenders to plain HTML/CSS/JS in
			// /build, which is what GitHub Pages serves. `404.html` doubles as a
			// single-page fallback so a deep link still boots the app.
			adapter: adapter({ fallback: '404.html' }),

			prerender: {
				// venue.jpg and rsvp.jpg are deliberately absent until real photos
				// are dropped into static/images — <Photo> swaps in a placeholder
				// at runtime. Any other broken link should still fail the build.
				handleHttpError: ({ path, message }) => {
					if (/\/images\/(venue|rsvp)\.jpg$/.test(path)) return;
					throw new Error(message);
				}
			},

			paths: {
				// GitHub Pages serves this repo from /ChahalWedding, not the domain
				// root, so every internal link and asset needs that prefix. The
				// deploy workflow sets BASE_PATH; locally it stays empty.
				base: /** @type {'' | `/${string}`} */ (process.env.BASE_PATH ?? '')
			}
		})
	]
});
