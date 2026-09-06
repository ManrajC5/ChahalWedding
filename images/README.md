# Photos

Add the couple's photos here to go live. Until a file exists, the site shows an
on-palette placeholder instead of a broken image.

## How to add the real photos

1. Save the photos into **this folder** (`static/images/`) using the
   **exact filenames** in the table below. Keep them as `.jpg`.
2. That's it — no code changes needed. Refresh the site.

## Filenames (use these exact names)

| Filename                | Where it appears              | Photo                                                    |
| ----------------------- | ----------------------------- | ------------------------------------------------------- |
| `couple-bouquet.jpg`    | Hero background + Gallery      | The two of them seated, smiling, Janelle with a bouquet |
| `ring-exchange.jpg`     | Our Story + Gallery           | Harwant placing the ring on Janelle's hand              |
| `cake-feeding.jpg`      | Gallery                       | The moment at the cake table                            |
| `venue.jpg`             | Venue section                 | The wedding venue in Amritsar (not added yet)           |
| `rsvp.jpg`              | RSVP section                  | Any photo of the two of you (not added yet)             |

## Fallback assets (leave these here)

| File               | Purpose                                             |
| ------------------ | --------------------------------------------------- |
| `hero.svg`         | Dark placeholder shown if `couple-bouquet.jpg` is missing |
| `placeholder.svg`  | Generic placeholder for the story/gallery/venue/RSVP photos |

> Tip: keep `couple-bouquet.jpg` large (~1600px+ wide, reasonably compressed)
> since it's the full-screen hero. The gallery/story images are lazy-loaded, so
> medium-sized files are fine.
