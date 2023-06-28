/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        margarine: ["Margarine", "sans-serif"],
      },
      dropShadow: {
        letter: "3px 3px 1px rgba(0, 0, 0, 0.75)",
      },
    },
  },
  plugins: [],
};
