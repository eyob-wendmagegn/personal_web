// nextfronted/tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  darkMode: 'class', // Enable class-based dark mode
  plugins: [],
};