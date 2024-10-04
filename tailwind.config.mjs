/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: '0px',
      sm: '350px',
      md: '435px',
      lg: '992px',
      xl: '1200px',
    },
  },
  plugins: [],
}