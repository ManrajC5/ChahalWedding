<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Check, Mail, Loader2 } from '@lucide/svelte';
	import { couple, wedding, location, rsvp } from '$lib/site.js';

	/**
	 * Form state. Attendance defaults to "yes" because guests arrive here from
	 * the "I'll be attending" button on the home page.
	 */
	let form = $state({
		name: '',
		email: '',
		attending: 'yes',
		guests: '1',
		message: ''
	});

	/** 'idle' | 'sending' | 'sent' | 'email' | 'error' */
	let status = $state('idle');
	let errorMessage = $state('');

	const choices = [
		{ value: 'yes', label: 'Joyfully accepts', hint: 'I will be attending' },
		{ value: 'no', label: 'Regretfully declines', hint: 'I cannot make it' }
	];

	const attendingLabel = $derived(
		form.attending === 'yes' ? 'Joyfully accepts' : 'Regretfully declines'
	);

	/** Plain-text summary, reused for the email fallback and the confirmation. */
	function summary() {
		return [
			`Name: ${form.name}`,
			`Email: ${form.email}`,
			`Attending: ${attendingLabel}`,
			form.attending === 'yes' ? `Number of guests: ${form.guests}` : null,
			form.message ? `Note: ${form.message}` : null
		]
			.filter(Boolean)
			.join('\n');
	}

	function openMailFallback() {
		const verb = form.attending === 'yes' ? 'will be attending' : 'sends regrets';
		const href =
			`mailto:${encodeURIComponent(rsvp.email)}` +
			`?subject=${encodeURIComponent(`RSVP — ${form.name} ${verb}`)}` +
			`&body=${encodeURIComponent(summary())}`;
		window.location.href = href;
		status = 'email';
	}

	/** @param {SubmitEvent & { currentTarget: HTMLFormElement }} event */
	async function onSubmit(event) {
		event.preventDefault();
		if (status === 'sending') return;

		// No form service configured yet, so hand off to the guest's mail client
		// and the RSVP still reaches you. See `rsvp.formEndpoint` in site.js.
		if (!rsvp.formEndpoint) {
			openMailFallback();
			return;
		}

		status = 'sending';
		errorMessage = '';

		try {
			const response = await fetch(rsvp.formEndpoint, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: new FormData(event.currentTarget)
			});
			if (!response.ok) throw new Error(`Request failed (${response.status}).`);
			status = 'sent';
		} catch (error) {
			status = 'error';
			errorMessage = error instanceof Error ? error.message : 'Something went wrong.';
		}
	}
</script>

<svelte:head>
	<title>RSVP · {couple.fullFirst} &amp; {couple.fullSecond}</title>
	<meta
		name="description"
		content={`Let ${couple.first} and ${couple.second} know whether you will be joining them on ${wedding.dateLong} in ${location.cityLine}.`}
	/>
</svelte:head>

<Navbar solid />

<main class="min-h-[100svh] pb-24 pt-32 md:pb-32 md:pt-40">
	<div class="mx-auto max-w-2xl px-6">
		<header class="text-center">
			<p class="eyebrow">RSVP</p>
			<h1 class="mt-6 text-4xl font-light leading-tight text-charcoal sm:text-5xl">
				Will you be <span class="italic text-wine">joining us?</span>
			</h1>
			<p class="mt-5 font-sans text-sm leading-relaxed text-charcoal/65">
				{wedding.dateLong} · {location.cityLine}
			</p>
			<span class="mx-auto mt-8 block rule-wine"></span>
		</header>

		{#if status === 'sent' || status === 'email'}
			<div class="frame-forest mt-14 px-8 py-14 text-center">
				<span
					class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 text-forest"
				>
					{#if status === 'sent'}
						<Check size={26} strokeWidth={1.6} />
					{:else}
						<Mail size={24} strokeWidth={1.6} />
					{/if}
				</span>

				<h2 class="mt-8 text-3xl font-light text-charcoal">
					{#if form.attending === 'yes'}
						Wonderful — we cannot wait to see you.
					{:else}
						Thank you for letting us know.
					{/if}
				</h2>

				<p class="mx-auto mt-5 max-w-md font-sans text-sm leading-relaxed text-charcoal/70">
					{#if status === 'sent'}
						Your RSVP has been sent. We will be in touch with the details closer to the day.
					{:else}
						Your email app should have opened with your RSVP ready to go — press send and it
						is on its way to us.
					{/if}
				</p>

				{#if status === 'email'}
					<div
						class="mx-auto mt-8 max-w-md whitespace-pre-line border-t border-forest/25 pt-6 text-left font-sans text-xs leading-relaxed text-charcoal/60"
					>
						{summary()}
					</div>
				{/if}

				<a href="/#home" class="btn-outline-forest mt-10">Back to the wedding</a>
			</div>
		{:else}
			<form onsubmit={onSubmit} class="mt-14 space-y-8">
				<!-- Attendance -->
				<fieldset>
					<legend class="font-sans text-[0.7rem] uppercase tracking-label text-forest">
						Your answer
					</legend>
					<div class="mt-4 grid gap-3 sm:grid-cols-2">
						{#each choices as choice}
							<label
								class="cursor-pointer border px-5 py-5 transition-colors duration-300 ease-lux
									{form.attending === choice.value
									? 'border-wine bg-wine/[0.04]'
									: 'border-gold/30 hover:border-wine/50'}"
							>
								<input
									type="radio"
									name="attending"
									value={choice.value}
									bind:group={form.attending}
									class="sr-only"
								/>
								<span class="block font-serif text-xl text-charcoal">{choice.label}</span>
								<span class="mt-1 block font-sans text-xs text-charcoal/55">{choice.hint}</span>
							</label>
						{/each}
					</div>
				</fieldset>

				<!-- Name -->
				<div>
					<label for="name" class="font-sans text-[0.7rem] uppercase tracking-label text-forest">
						Full name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						autocomplete="name"
						bind:value={form.name}
						placeholder="Your name"
						class="mt-3 w-full border-b border-gold/40 bg-transparent pb-3 font-serif text-xl text-charcoal
							transition-colors duration-300 placeholder:font-sans placeholder:text-base placeholder:text-charcoal/30
							focus:border-wine focus:outline-none"
					/>
				</div>

				<!-- Email -->
				<div>
					<label for="email" class="font-sans text-[0.7rem] uppercase tracking-label text-forest">
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						autocomplete="email"
						bind:value={form.email}
						placeholder="you@example.com"
						class="mt-3 w-full border-b border-gold/40 bg-transparent pb-3 font-serif text-xl text-charcoal
							transition-colors duration-300 placeholder:font-sans placeholder:text-base placeholder:text-charcoal/30
							focus:border-wine focus:outline-none"
					/>
				</div>

				<!-- Guest count only matters for a yes -->
				{#if form.attending === 'yes'}
					<div>
						<label for="guests" class="font-sans text-[0.7rem] uppercase tracking-label text-forest">
							Number of guests
						</label>
						<select
							id="guests"
							name="guests"
							bind:value={form.guests}
							class="mt-3 w-full border-b border-gold/40 bg-transparent pb-3 font-serif text-xl text-charcoal
								transition-colors duration-300 focus:border-wine focus:outline-none"
						>
							{#each ['1', '2', '3', '4', '5', '6'] as n}
								<option value={n}>{n}</option>
							{/each}
						</select>
					</div>
				{/if}

				<!-- Message -->
				<div>
					<label for="message" class="font-sans text-[0.7rem] uppercase tracking-label text-forest">
						A note for the couple
						<span class="normal-case tracking-normal text-charcoal/40">(optional)</span>
					</label>
					<textarea
						id="message"
						name="message"
						rows="4"
						bind:value={form.message}
						placeholder="Dietary needs, travel plans, or just a hello…"
						class="mt-3 w-full resize-none border-b border-gold/40 bg-transparent pb-3 font-sans text-base leading-relaxed text-charcoal
							transition-colors duration-300 placeholder:text-charcoal/30 focus:border-wine focus:outline-none"
					></textarea>
				</div>

				{#if status === 'error'}
					<p class="font-sans text-sm text-rose" role="alert">
						We could not send that — {errorMessage} Please try again, or email us at {rsvp.email}.
					</p>
				{/if}

				<div class="flex flex-col items-center gap-4 pt-4">
					<button
						type="submit"
						class="btn-wine w-full sm:w-auto"
						disabled={status === 'sending'}
					>
						{#if status === 'sending'}
							<Loader2 size={15} strokeWidth={1.8} class="animate-spin" />
							Sending…
						{:else}
							Send our RSVP
						{/if}
					</button>
					<p class="text-center font-sans text-xs uppercase tracking-wide2 text-charcoal/40">
						Kindly respond by {rsvp.deadline}
					</p>
				</div>
			</form>
		{/if}
	</div>
</main>

<Footer />
