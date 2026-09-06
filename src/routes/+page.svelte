<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	import Intro from '$lib/components/Intro.svelte';
	import Story from '$lib/components/Story.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import Location from '$lib/components/Location.svelte';
	import Venue from '$lib/components/Venue.svelte';
	import Rsvp from '$lib/components/Rsvp.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { couple, wedding, location } from '$lib/site.js';
</script>

<svelte:head>
	<title>{couple.fullFirst} & {couple.fullSecond} · {wedding.dateLong}</title>
	<meta
		name="description"
		content={`Join ${couple.fullFirst} and ${couple.fullSecond} as they celebrate their wedding on ${wedding.dateLong} in ${location.cityLine}.`}
	/>
</svelte:head>

<Navbar />

<main>
	<Hero />
	<Countdown />
	<Divider tone="gold" />
	<Intro />
	<Divider tone="wine" />
	<Story />
	<Divider tone="gold" />
	<Gallery />
	<Divider tone="forest" />
	<Location />
	<Divider tone="forest" />
	<Venue />
	<Divider tone="wine" />
	<Rsvp />
</main>

<Footer />
