/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: '0px',
      sm: '400px',
      md: '635px',
      lg: '992px',
      xl: '1200px',
    },
  },
  plugins: [],
}