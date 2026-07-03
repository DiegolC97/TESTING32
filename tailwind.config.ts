import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/interfaces/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#be185d", // pink-700
          dark: "#9d174d", // pink-800
        },
      },
    },
  },
  plugins: [],
};

export default config;
