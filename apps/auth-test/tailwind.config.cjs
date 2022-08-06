// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../libs/core/src/**/*.{ts,tsx}",
    "../../libs/components/src/**/*.{ts,tsx}",
    "../../libs/modules/**/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.indigo,
          DEFAULT: colors.indigo["500"],
        },
      },
      boxShadow: {
        focus: "0 0 0 4px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        lana: "'Source Sans Pro', sans-serif",
      },
    },
  },
  plugins: [],
};
