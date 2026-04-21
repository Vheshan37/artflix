import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0A",
        charcoal: "#111111",
        graphite: "#1a1a1a",
        smoke: "#242424",
        ash: "#333333",
        platinum: "#c8c0b4",
        gold: {
          DEFAULT: "#b8966a",
          light: "#d4aa7a",
        },
        ivory: "#f5f0e8",
        cream: "#ede8df",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
      letterSpacing: {
        widest: ".25em",
      },
    },
  },
  plugins: [],
};
export default config;
