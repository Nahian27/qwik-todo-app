/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["business", "corporate"],
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
