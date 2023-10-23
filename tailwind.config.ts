import type { Config } from "tailwindcss";

const config: Config = {
  extend: {
    willChange: ["transform"],
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sh: ["var(--font-sh)"],
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
export default config;
