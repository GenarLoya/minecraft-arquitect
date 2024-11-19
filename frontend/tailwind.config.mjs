/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C6E6F",
        secondary: "#4F4B4B",
      },
      borderRadius: {
        common: "10px",
      },
      padding: {
        common: "10px",
      },
    },
  },
  plugins: [],
};
