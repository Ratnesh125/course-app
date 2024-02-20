/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: ['responsive'],
    },
  },
  plugins: [],
  experimental: {
    fractionUnit: true,
  },
}