# Harwant & Janelle — Wedding Website

A luxury editorial wedding site for **Harwant Chahal & Janelle Ouzts**,
**January 5, 2027** in **Amritsar, Punjab, India**. Built with SvelteKit
(Svelte 5, runes), Tailwind CSS, and `@lucide/svelte`. One long home page plus a
separate `/rsvp` form page.

## Commands

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # build the static site into /build
npm run preview # serve /build locally
```

## Dependencies added

| Package                            | Why                                              |
| ---------------------------------- | ------------------------------------------------ |
| `tailwindcss`, `postcss`, `autoprefixer` | Utility-first styling + the design system  |
| `@lucide/svelte`                   | Icons (menu, lightbox arrows, event details)     |

No other runtime libraries — animations use CSS + `IntersectionObserver`.

## Structure

```
src/
  app.css                      Tailwind layers, design tokens, reduced-motion rules
  app.html                     Fonts (Cormorant Garamond + Inter), no-JS fallback
  lib/
    site.js                    ★ All editable content: names, date, location, venue, gallery, RSVP
    actions/reveal.js          Scroll-reveal action (IntersectionObserver)
    components/
      Navbar.svelte            Fixed nav, animated mobile menu
      Hero.svelte              Full-screen cinematic hero + scroll cue
      Countdown.svelte         Reactive countdown to 2027-01-05T00:00:00
      Intro.svelte             "A New Chapter" welcome band
      Story.svelte             Split editorial "Our Story"
      Gallery.svelte           Curated three-photo editorial grid
      Lightbox.svelte          Accessible fullscreen viewer (keyboard + focus)
      Photo.svelte             Image with graceful placeholder fallback
      Divider.svelte           Ornamental rule + diamond between sections
      Location.svelte          Amritsar, Punjab — city intro + travel details
      Venue.svelte             Venue photo placeholder + description
      Rsvp.svelte              "Will you be joining us?" band linking to /rsvp
      Footer.svelte            Closing section
  routes/
    +layout.svelte             Imports global CSS
    +page.svelte               ★ Composes the home page (the "App.svelte" of SvelteKit)
    rsvp/+page.svelte          The RSVP contact form
static/images/                 Placeholder art + README manifest for real photos
```

> This is SvelteKit, so the requested `App.svelte` is `src/routes/+page.svelte`
> and the `components/` folder lives at `src/lib/components/`.

## Editing content

- **Names, date, location, venue, gallery list, RSVP settings** → `src/lib/site.js`
- **Our Story copy** → `src/lib/components/Story.svelte`
- **Venue copy** → the `venue` object in `src/lib/site.js`
- **Photos** → drop the real files in `static/images/` with the exact
  filenames listed in `static/images/README.md`

Anything in `[brackets]` (e.g. the venue name) is an intentional placeholder
awaiting confirmed details.

### RSVP submissions

`/rsvp` is a real form. Out of the box `rsvp.formEndpoint` in `site.js` is empty,
so submitting opens the guest's mail client with a pre-filled RSVP addressed to
`rsvp.email` — set that address first. To collect responses automatically
instead, paste a form-service URL (Formspree, Getform, Basin, a Google Form's
`formResponse` URL, …) into `rsvp.formEndpoint` and the form POSTs to it.

## Notes

- **Colour**: the whole site sits on one solid white ground. Gold, forest green
  and burgundy appear only in borders, rules, frames, ornaments and type — never
  as background fills. The tokens live in `tailwind.config.js`; the reusable
  frame/rule/button classes are in the `@layer components` block of
  `src/app.css` (`.frame-gold` / `.frame-forest` / `.frame-wine`, `.rule-*`,
  `.btn-wine`, `.btn-outline-*`).
- **Hero crop**: the header photo is a tall portrait, so `object-position` is
  tuned (`object-[50%_30%]`) and the copy is bottom-anchored to keep both faces
  visible and unobscured at every viewport size. Adjust that one utility in
  `Hero.svelte` if you swap the photo.
- **Countdown** is fully reactive (updates every second, clamps at zero, shows
  "The Day Has Arrived" once reached). No hard-coded values.
- **Accessibility**: semantic landmarks, keyboard-navigable lightbox (←/→/Esc),
  visible focus rings, alt text on every photo.
- **Motion**: entrance/hover animations are subtle and fully disabled under
  `prefers-reduced-motion`.
- The images are **elegant on-palette placeholders**, not stock wedding photos —
  swap in the couple's real photographs to go live.
## Deploying to GitHub Pages

The site is fully prerendered by `@sveltejs/adapter-static` into `/build`, and
the `gh-pages` package publishes that folder to the `gh-pages` branch.

**To publish:**

```bash
npm run deploy
```

`predeploy` runs the build for you first, so that one command is the whole
deploy. Pushing to `main` does *not* republish the site — it only updates the
source. Run `npm run deploy` whenever you want the live site to catch up.

**One-time setup in the repo:** Settings → Pages → *Build and deployment* →
Source = **Deploy from a branch**, Branch = **`gh-pages`** / **`/ (root)`**.
Pointing it at `main` instead is what made Pages render this README: there is no
`index.html` at the repo root, so it falls back to the readme.

Four things make the static build work, and all four matter:

| Piece | Where | Why |
| ----- | ----- | --- |
| `adapter-static` + `fallback: '404.html'` | `vite.config.js` | Pages only serves files; there is no Node server. The fallback also catches deep links. |
| `prerender = true` | `src/routes/+layout.js` | Every route has to exist as HTML at build time. |
| `paths.base` from `$BASE_PATH` | `vite.config.js` | The site lives at `/ChahalWedding/`, not the domain root. The `deploy` scripts set it; `npm run dev` leaves it empty. |
| `static/.nojekyll` + `gh-pages -t true` | — | Jekyll discards directories starting with `_`, which would delete the whole `_app/` bundle. The `-t` flag makes sure the dotfile is published. |

Because of `paths.base`, **every internal link and image path must go through
`links` or `photos` in `src/lib/site.js`** (or `base` from `$app/paths`). A bare
`href="/rsvp"` or `src="/images/x.jpg"` will 404 once deployed.

To check what will be published before you publish it:

```bash
npm run predeploy
npm run preview:deploy
```

then open <http://localhost:4173/ChahalWedding/>.

> If you ever rename the repository, update `/ChahalWedding` in the `predeploy`
> and `preview:deploy` scripts in `package.json`.
