/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'matrix-black': '#131313',
        'matrix-gray': '#8B958F',
        primary: '#0066CC',
        'brand-blue': {
          DEFAULT: '#0066CC',
          light: '#3399FF',
          dark: '#004A99',
          50: '#E6F2FF',
          100: '#CCE4FF',
          200: '#99CAFF',
          300: '#66AFFF',
          400: '#3399FF',
          500: '#0080FF',
          600: '#0066CC',
          700: '#004A99',
          800: '#002B5C',
          900: '#001A3D',
        },
        brand: {
          blue: '#0066CC',
          'blue-light': '#3399FF',
          'blue-dark': '#004A99',
          light: '#ABB2FC',
          purple: '#1A0B68',
          paper: '#F7F7FF',
        },
      },
      fontFamily: {
        mono: ['var(--font-saira)', 'Saira Condensed', 'sans-serif'],
        heading: ['var(--font-saira)', 'Saira Condensed', 'sans-serif'],
        body: ['var(--font-exo)', 'Exo 2', 'sans-serif'],
        sans: ['var(--font-exo)', 'Exo 2', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
