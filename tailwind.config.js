/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B2733',
          50: '#EEF3F4',
          100: '#D3E0E3',
          // Added: mid tints for borders and text on light backgrounds.
          200: '#B4C7CC',
          500: '#546B75', // secondary text, 5.4:1 on white
          600: '#38505B', // body text, 8.4:1 on white
        },
        water: {
          50: '#EAF4F5',
          100: '#CFE7E9',
          200: '#9FCFD4',
          400: '#3E93A0',
          600: '#0E4F5C',
          700: '#0A3D48',
          900: '#062831',
        },
        aqua: {
          400: '#4FCBD6',
          500: '#21B8C7',
          600: '#1A96A3',
        },
        sun: {
          400: '#F7C666',
          500: '#F4B942',
          600: '#DE9E22',
        },
        foam: {
          50: '#F6FAF9',
          100: '#EDF6F5',
          200: '#E1EFEE',
        },
      },
      fontFamily: {
        display: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // Added: fluid headline scale so page titles stay strong on every screen
      // without stacking sm:/lg: size classes on each heading.
      fontSize: {
        display: [
          'clamp(2.25rem, 1.6rem + 2.8vw, 3.5rem)',
          { lineHeight: '1.08', letterSpacing: '-0.02em' },
        ],
        headline: [
          'clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem)',
          { lineHeight: '1.15', letterSpacing: '-0.015em' },
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,39,51,0.06), 0 8px 24px -12px rgba(11,39,51,0.18)',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}