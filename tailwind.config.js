/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './@/components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './@/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617'
      },
      mortar: {
        50: '#f8f7f8',
        100: '#f3f0f3',
        200: '#e8e2e6',
        300: '#d6cbd4',
        400: '#bcaab7',
        500: '#a58f9f',
        600: '#8e7486',
        700: '#775f6f',
        800: '#63515c',
        900: '#50424b',
        950: '#31262d'
      },
      shiraz: {
        50: '#fdf4f3',
        100: '#fce8e7',
        200: '#f8d4d3',
        300: '#f3aeae',
        400: '#eb8182',
        500: '#df545a',
        600: '#cb3342',
        700: '#b12737',
        800: '#8f2232',
        900: '#7b2030',
        950: '#440d16'
      },
      'burning-orange': {
        50: '#fff4ed',
        100: '#ffe7d5',
        200: '#ffcba9',
        300: '#fea673',
        400: '#fd7336',
        500: '#fb5214',
        600: '#ec370a',
        700: '#c4250a',
        800: '#9b1f11',
        900: '#7d1c11',
        950: '#440b06'
      },
      'harvest-gold': {
        50: '#fcf9f0',
        100: '#f8f0dc',
        200: '#f0deb8',
        300: '#e3c080',
        400: '#daa65d',
        500: '#d28e3d',
        600: '#c47832',
        700: '#a35e2b',
        800: '#834c29',
        900: '#6a3f24',
        950: '#391f11'
      },
      'summer-green': {
        50: '#f2f7f3',
        100: '#e0ebe2',
        200: '#c3d7c8',
        300: '#9dbca6',
        400: '#6f987c',
        500: '#4e7b5e',
        600: '#3a6149',
        700: '#2f4d3c',
        800: '#273e31',
        900: '#213328',
        950: '#111d16'
      }
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
