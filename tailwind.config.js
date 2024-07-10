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
      },
      // new palette
      shark: {
        50: '#f6f7f9',
        100: '#eceff2',
        200: '#d4dbe3',
        300: '#aebccb',
        400: '#8297ae',
        500: '#637b94',
        600: '#4e637b',
        700: '#405064',
        800: '#384454',
        900: '#323c48',
        950: '#222831'
      },
      mako: {
        50: '#f4f6f7',
        100: '#e3e8ea',
        200: '#cad2d7',
        300: '#a4b1bc',
        400: '#788998',
        500: '#5c6d7e',
        600: '#4f5b6b',
        700: '#454e59',
        800: '#3d444d',
        900: '#393e46',
        950: '#21252b'
      },
      pumpkin: {
        50: '#fff7ed',
        100: '#ffecd4',
        200: '#ffd6a9',
        300: '#ffb872',
        400: '#fe8f39',
        500: '#fd7014',
        600: '#ee5408',
        700: '#c53d09',
        800: '#9c3110',
        900: '#7e2a10',
        950: '#441206'
      },
      gallery: {
        50: '#f8f8f8',
        100: '#eeeeee',
        200: '#dcdcdc',
        300: '#bdbdbd',
        400: '#989898',
        500: '#7c7c7c',
        600: '#656565',
        700: '#525252',
        800: '#464646',
        900: '#3d3d3d',
        950: '#292929'
      },
      cardinal: {
        50: '#fff0f1',
        100: '#ffe1e5',
        200: '#ffc8d0',
        300: '#ff9bab',
        400: '#ff637f',
        500: '#ff2c57',
        600: '#f60842',
        700: '#c80036',
        800: '#ae0336',
        900: '#940736',
        950: '#530018'
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
