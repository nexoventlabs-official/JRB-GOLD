import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		screens: {
			'xs': '375px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1440px',
			'3xl': '1920px',
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				xs: '1.25rem',
				sm: '2rem',
				md: '2.5rem',
				lg: '3rem',
				xl: '4rem',
				'2xl': '5rem',
			},
			screens: {
				'2xl': '1400px'
			}
		},
			extend: {
			animation: {
				'ping-once': 'ping 1s cubic-bezier(0, 0, 0.2, 1)',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'shimmer': 'shimmer 2s infinite'
			},
			keyframes: {
				ping: {
					'75%, 100%': {
						transform: 'scale(1.1)',
						opacity: '0',
					},
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				}
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'inter': ['Inter', 'sans-serif'],
				'sans': ['Inter', 'sans-serif'],
				'serif': ['Playfair Display', 'serif'],
			},
			colors: {
				// Brand Colors
				gold: 'hsl(var(--gold))',
				'gold-dark': 'hsl(var(--gold-dark))',
				charcoal: 'hsl(var(--charcoal))',
				ink: 'hsl(var(--ink))',
				ivory: 'hsl(var(--ivory))',
				slate: 'hsl(var(--slate))',
				maroon: 'hsl(var(--maroon))',
				
				// Semantic Tokens
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			backgroundImage: {
				'gradient-gold': 'var(--gradient-gold)',
				'gradient-surface': 'var(--gradient-surface)',
			},
			boxShadow: {
				'luxury': 'var(--shadow-luxury)',
				'elevated': 'var(--shadow-elevated)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
