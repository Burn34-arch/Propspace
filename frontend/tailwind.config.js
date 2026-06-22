/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#e8edf5',
          100: '#c5d1e8',
          200: '#9fb3d8',
          300: '#7895c8',
          400: '#5a7dbb',
          500: '#3d65ae',
          600: '#2d538f',
          700: '#1e3f6f',
          800: '#132b4f',
          900: '#0a1a30',
        },
        gold: {
          50:  '#fef9ec',
          100: '#fdf0c8',
          200: '#fbe495',
          300: '#f8d15e',
          400: '#f5be30',
          500: '#e6a817',
          600: '#c98b0e',
          700: '#a56c0c',
          800: '#814f0d',
          900: '#5e3610',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
