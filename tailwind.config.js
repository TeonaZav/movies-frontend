/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { Outfit: ["Outfit", "sans-serif"] },
    screens: {
      sm: "375px",
      // => @media (min-width: 375px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
  },
  variants: {
    extend: {
      opacity: ["group-hover"],
    },
  },
  plugins: [],
};
