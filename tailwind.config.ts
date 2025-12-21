import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - Ada-e-Haandi
        navy: {
          50: '#E8EBF4',
          100: '#C5CCE3',
          200: '#9FABD0',
          300: '#7989BD',
          400: '#5C6FAE',
          500: '#2B3A67', // Primary brand color
          600: '#1E2A4A',
          700: '#141C33',
          800: '#0C111F',
          900: '#050810',
        },
        gold: {
          50: '#FDF8EB',
          100: '#F9EDCC',
          200: '#F5E0A8',
          300: '#F0D384',
          400: '#ECC660',
          500: '#D4A537', // Primary accent color
          600: '#B8860B',
          700: '#8A6508',
          800: '#5C4306',
          900: '#2E2203',
        },
        cream: {
          50: '#FFFDFB',
          100: '#FDF8F0',
          200: '#FAF3E5',
          300: '#F5EBDA',
          400: '#F0E3CF',
          500: '#E8D5BC',
        },
        spice: {
          saffron: '#FF9933',
          turmeric: '#FFC30B',
          chili: '#C41E3A',
          coriander: '#3B7A57',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Responsive typography scale
        'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-lg': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'heading-md': ['1.875rem', { lineHeight: '1.3' }],
        'heading-sm': ['1.5rem', { lineHeight: '1.35' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        elegant: '0 4px 20px -2px rgba(43, 58, 103, 0.15)',
        'elegant-lg': '0 10px 40px -4px rgba(43, 58, 103, 0.2)',
        gold: '0 4px 20px -2px rgba(212, 165, 55, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #D4A537 0%, #F7E7CE 50%, #D4A537 100%)',
        'gradient-navy': 'linear-gradient(180deg, #2B3A67 0%, #141C33 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

export default config
