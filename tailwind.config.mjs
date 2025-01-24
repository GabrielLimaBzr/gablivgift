/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: '0px',
      sm: '200px',
      md: '536px',
      lg: '794px',
      xl: '1200px',
    },
  },
  plugins: [],
}