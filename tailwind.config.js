/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        amiri: ['Amiri', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        emerald: {
          900: '#064e3b',
        },
      },
    },
  },
  plugins: [],
};
