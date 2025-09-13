/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-bebas-neue)", "sans-serif"],
      },
      colors: {
        primary: "#0d2e24",
        "primary-dark": "#134435",
        cream: "#e8d3a5",
        "cream-light": "#ffe2aa",
        "gray-light": "#ececec",
      },
    },
  },
  plugins: [],
}