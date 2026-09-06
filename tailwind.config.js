/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './src/app.html'],
	theme: {
		extend: {
			colors: {
				// Warm neutral editorial ground.
				ivory: '#F7F3EC',
				cream: '#F1EADE',
				warmwhite: '#FBF9F5',
				beige: '#E7DCCB',
				champagne: '#DEC9A8',
				taupe: '#A99B87',
				charcoal: '#2B2620',
				ink: '#1C1813',
				rose: '#C99B8C',
				gold: '#B08D57',

				// Jewel accents. Deep forest green and burgundy carry the scheme:
				// green for the Punjab/location half, burgundy for the celebration
				// and RSVP half, with gold as the metallic hairline tying them.
				forest: '#1E3B2F',
				moss: '#3D5F4B',
				sage: '#93A899',
				burgundy: '#4E1B26',
				wine: '#7A2E3B',
				blush: '#C08E96'
			},
			fontFamily: {
				serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
			},
			letterSpacing: {
				label: '0.32em',
				wide2: '0.18em'
			},
			maxWidth: {
				editorial: '78rem'
			},
			transitionTimingFunction: {
				lux: 'cubic-bezier(0.22, 1, 0.36, 1)'
			},
			keyframes: {
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'ken-burns': {
					'0%': { transform: 'scale(1.08)' },
					'100%': { transform: 'scale(1)' }
				},
				'flip-in': {
					'0%': { opacity: '0.35', transform: 'translateY(-6px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'fade-up': 'fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) both',
				'fade-in': 'fade-in 1.2s ease both',
				'ken-burns': 'ken-burns 12s ease-out both',
				'flip-in': 'flip-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both'
			}
		}
	},
	plugins: []
};
