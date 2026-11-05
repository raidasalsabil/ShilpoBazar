/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Desi folk palette derived from reference visual:
        // Warm Parchment Ivory
        ivory: {
          50: '#FDFBFA',
          100: '#FAF5EB',
          200: '#F5EDE0',
          300: '#EADEC9',
          400: '#DDD0B7',
          DEFAULT: '#FAF5EB',
        },
        // Deep Terracotta Brick / Crimson Earth
        terracotta: {
          50: '#FDF3F1',
          100: '#FBE4E1',
          200: '#F7C9C3',
          300: '#EE9E93',
          400: '#E06B5B',
          500: '#A63424',
          600: '#8E281B',
          700: '#751F14',
          800: '#5C170E',
          DEFAULT: '#A63424',
        },
        // Deep Indigo Heritage / Teal Navy
        indigo: {
          50: '#F2F6F9',
          100: '#E3ECF2',
          200: '#C8DAE5',
          300: '#9DBFD3',
          400: '#699EBD',
          500: '#2A5270',
          600: '#1A3852',
          700: '#142C41',
          800: '#0E2030',
          DEFAULT: '#1A3852',
        },
        // Marigold Ochre / Warm Golden Amber
        mustard: {
          50: '#FEF9EE',
          100: '#FDF0D7',
          200: '#FBDEAE',
          300: '#F7C577',
          400: '#F2A944',
          500: '#E89D35',
          600: '#CE8122',
          700: '#A66117',
          DEFAULT: '#E89D35',
        },
        // Olive Sage / Folk Green
        sage: {
          50: '#F5F7F1',
          100: '#E8EDE0',
          200: '#D3DCC5',
          300: '#B6C5A2',
          400: '#94A87C',
          500: '#768A50',
          600: '#5F703E',
          700: '#495630',
          DEFAULT: '#768A50',
        },
        // Tangerine Clay / Sunset Amber
        tangerine: {
          50: '#FEF4ED',
          100: '#FCE6D6',
          200: '#F8CBB0',
          300: '#F2A67E',
          400: '#E87D4B',
          500: '#DF6B2B',
          600: '#C5531B',
          DEFAULT: '#DF6B2B',
        },
        // Craft Dark Text & Borders
        craft: {
          text: '#261C19',
          muted: '#61524D',
          border: '#E8DEC9',
          card: '#FFFFFF',
          paper: '#FAF5EB',
        }
      },
      fontFamily: {
        bangla: ['"Hind Siliguri"', 'sans-serif'],
        english: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'craft': '0 2px 8px -1px rgba(38, 28, 25, 0.07), 0 1px 3px -1px rgba(38, 28, 25, 0.04)',
        'craft-hover': '0 10px 24px -2px rgba(38, 28, 25, 0.12), 0 4px 8px -2px rgba(38, 28, 25, 0.06)',
      }
    },
  },
  plugins: [],
}
