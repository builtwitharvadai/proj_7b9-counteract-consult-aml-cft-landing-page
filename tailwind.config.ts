import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Brand Manual V1 */
        'matrix-black': '#131313',
        'matrix-gray': '#8B958F',
        'cyber-green': '#00FD00',
        brand: {
          blue: '#2C3EF8',
          light: '#ABB2FC',
          purple: '#1A0B68',
          soft: '#99FE99',
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

export default config;
