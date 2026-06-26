/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: '#FF6B35',
        dark: '#2D2D3F',
        peach: '#FFB07C',
        burgundy: '#8B2F3A',
        mint: '#2ECC71',
        cream: '#FDF5E6',
        gold: '#F1C40F',
      }
    },
  },
  plugins: [],
}