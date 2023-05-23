/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "semi-trans": "rgba(0, 0, 0, 0.730)",
      },
    },
  },
  plugins: [require("daisyui")],
};
