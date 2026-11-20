/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          50: '#FDF8F3',
          100: '#FAF0E6',
          200: '#F4DECA',
          300: '#ECC4A5',
          400: '#DF9F6D',
          500: '#C8793B',
          600: '#B25D2B',
          700: '#944723',
          800: '#773822',
          900: '#5F2E1E',
          950: '#34160D',
        },
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FEFBF3',
          200: '#FAF5EA',
          300: '#F5EBD7',
          400: '#EBD8B8',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(95, 46, 30, 0.08), 0 4px 6px -2px rgba(95, 46, 30, 0.04)',
        'luxury-lg': '0 20px 40px -10px rgba(95, 46, 30, 0.12), 0 8px 16px -4px rgba(95, 46, 30, 0.06)',
      }
    },
  },
  plugins: [],
}
