/**
 * Central content for the wedding site.
 *
 * Only a few facts are confirmed: the couple, the date, and the city. Everything
 * marked with [brackets] is a placeholder — edit the strings below to replace
 * them. Image files live in /static/images/ and are served from /images/… — see
 * static/images/README.md for the manifest of which photo goes where.
 */

export const couple = {
	first: 'Harwant',
	second: 'Janelle',
	fullFirst: 'Harwant Chahal',
	fullSecond: 'Janelle Ouzts',
	monogram: 'H & J'
};

/** Wedding date. The countdown reads `dateISO` directly. */
export const wedding = {
	dateISO: '2027-01-05T00:00:00',
	dateLong: 'January 5, 2027',
	dateShort: '05.01.2027',
	// Placeholder — replace when confirmed.
	time: '[Wedding Time]'
};

export const nav = [
	// Root-relative so these still work from /rsvp, not just the home page.
	{ label: 'Home', href: '/#home' },
	{ label: 'Our Story', href: '/#story' },
	{ label: 'Gallery', href: '/#gallery' },
	{ label: 'Location', href: '/#location' },
	{ label: 'RSVP', href: '/rsvp' }
];

/**
 * Gallery images. Save the real photo files into /static/images/ with the
 * filenames below (see static/images/README.md). Until then, each shows an
 * on-palette placeholder rather than a broken image.
 */
export const gallery = [
	{
		src: '/images/couple-bouquet.jpg',
		alt: 'Harwant and Janelle seated together, smiling, Janelle holding a bouquet'
	},
	{
		src: '/images/ring-exchange.jpg',
		alt: 'Harwant placing the engagement ring on Janelle’s hand'
	},
	{
		src: '/images/cake-feeding.png',
		alt: 'Harwant and Janelle sharing a tender moment at the cake table'
	}
];

/**
 * Where the wedding is taking place. The city is confirmed; the bracketed
 * travel details are placeholders to fill in once they're settled.
 */
export const location = {
	city: 'Amritsar',
	region: 'Punjab',
	country: 'India',
	cityLine: 'Amritsar, Punjab, India',
	// A short, editable introduction to the city.
	blurb: [
		'We are getting married in Amritsar — the heart of Punjab, in northern India, and the city Harwant’s family calls home.',
		'It is a city of golden mornings, langar halls that never close, and streets that smell of cardamom and fresh parathas. We would love for you to see it with us.'
	],
	// Practical notes for travelling guests. Replace the [bracketed] values.
	details: [
		{
			label: 'City',
			value: 'Amritsar, Punjab, India'
		},
		{
			label: 'Nearest Airport',
			value: 'Sri Guru Ram Dass Jee International Airport (ATQ)'
		},
		{
			label: 'Travel & Stay',
			value: '[Hotel block, recommended flights and travel notes to come.]'
		},
		{
			label: 'Getting Around',
			value: '[Transport between the hotel and the venue to be confirmed.]'
		}
	],
	mapUrl: 'https://www.google.com/maps/place/Amritsar,+Punjab,+India',
	mapLabel: 'View Amritsar on the map'
};

/**
 * The venue. Everything here is a placeholder for now — drop the real name,
 * copy and photo in when it's booked. Save the photo as
 * /static/images/venue.jpg and it appears automatically.
 */
export const venue = {
	name: '[Venue Name]',
	address: '[Venue Address, Amritsar, Punjab]',
	image: '/images/venue.jpg',
	imageAlt: 'The wedding venue in Amritsar',
	imageCaption: '[Add a photo of the venue here]',
	// Replace with a description of the venue.
	blurb: [
		'[A short description of the venue goes here — what the space looks like, what makes it special, and what the day will feel like there.]',
		'[Add a second paragraph if you like: the grounds, the rooms, where the ceremony and the reception will each take place.]'
	]
};

/**
 * RSVP. `formEndpoint` is optional: paste a form-service URL (Formspree,
 * Getform, Basin, a Google Form's formResponse URL, …) and the RSVP form will
 * POST to it. Leave it empty and the form falls back to opening a pre-filled
 * email to `email` instead, so it still works with no backend.
 *
 * The photo beside the RSVP band is a placeholder until you save a real file at
 * /static/images/rsvp.jpg — no code change needed.
 */
export const rsvp = {
	formEndpoint: '',
	email: '[your-email@example.com]',
	deadline: '[RSVP by date]',
	image: '/images/rsvp.jpg',
	imageAlt: 'Harwant and Janelle',
	imageCaption: '[Add a photo here]'
};
