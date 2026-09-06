# Harwant & Janelle — Wedding Website

A luxury editorial wedding site for **Harwant Chahal & Janelle Ouzts**,
**January 5, 2027** in **Amritsar, Punjab, India**. Built with SvelteKit
(Svelte 5, runes), Tailwind CSS, and `@lucide/svelte`. One long home page plus a
separate `/rsvp` form page.

## Commands

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # production build
npm run preview # preview the production build
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
- `@sveltejs/adapter-auto` is the default; pick a specific
  [adapter](https://svelte.dev/docs/kit/adapters) for your deploy target.
