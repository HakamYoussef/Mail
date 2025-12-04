import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e7f0ff',
          100: '#c2d7ff',
          200: '#9bbcff',
          300: '#75a3ff',
          400: '#4e8bff',
          500: '#3572e8',
          600: '#285ab5',
          700: '#1c4382',
          800: '#0f2b4f',
          900: '#02131f',
        },
      },
      boxShadow: {
        card: '0 4px 16px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
