/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'rgba(255, 255, 255, 0.08)',
				input: 'rgba(255, 255, 255, 0.08)',
				ring: '#3B82F6',
				background: '#050507',
				foreground: '#F8FAFC',
				primary: {
					DEFAULT: '#3B82F6',
					foreground: '#F8FAFC',
					50: '#EFF6FF',
					100: '#DBEAFE',
					200: '#BFDBFE',
					300: '#93C5FD',
					400: '#60A5FA',
					500: '#3B82F6',
					600: '#2563EB',
					700: '#1D4ED8',
					800: '#1E40AF',
					900: '#1E3A8A',
				},
				secondary: {
					DEFAULT: '#22D3EE',
					foreground: '#F8FAFC',
				},
				accent: {
					DEFAULT: '#22D3EE',
					foreground: '#F8FAFC',
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#F8FAFC',
				},
				muted: {
					DEFAULT: '#12141A',
					foreground: '#94A3B8',
				},
				popover: {
					DEFAULT: '#0A0C10',
					foreground: '#F8FAFC',
				},
				card: {
					DEFAULT: '#12141A',
					foreground: '#F8FAFC',
				},
				cyber: {
					blue: '#3B82F6',
					cyan: '#22D3EE',
					dark: '#050507',
					surface: '#0A0C10',
					card: '#12141A',
					border: 'rgba(255, 255, 255, 0.08)',
					glow: 'rgba(59, 130, 246, 0.5)',
				}
			},
			fontFamily: {
				heading: ['Space Grotesk', 'sans-serif'],
				body: ['Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: '0.75rem',
				md: '0.5rem',
				sm: '0.25rem',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'glow-pulse': {
					'0%, 100%': { opacity: '0.5' },
					'50%': { opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-primary': 'linear-gradient(135deg, #3B82F6 0%, #22D3EE 100%)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
