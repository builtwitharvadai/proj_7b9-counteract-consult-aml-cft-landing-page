import type { Config } from 'tailwindcss';

/**
 * Brand Manual V1 blues (and related palette):
 * Primary Blue  #2C3EF8
 * Light Blue    #ABB2FC
 * Dark Purple   #1A0B68
 * Off-White     #F7F7FF
 * Black         #131313
 * White         #FFFFFF
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'matrix-black': '#131313',
        'matrix-gray': '#ABB2FC',
        'cyber-green': '#2C3EF8',
        brand: {
          blue: '#2C3EF8',
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

export default config;
