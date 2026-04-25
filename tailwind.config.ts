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
        obsidian: "rgb(var(--color-obsidian) / <alpha-value>)",
        charcoal: "rgb(var(--color-charcoal) / <alpha-value>)",
        graphite: "rgb(var(--color-graphite) / <alpha-value>)",
        smoke: "rgb(var(--color-smoke) / <alpha-value>)",
        ash: "rgb(var(--color-ash) / <alpha-value>)",
        platinum: "rgb(var(--color-platinum) / <alpha-value>)",
        gold: {
          DEFAULT: "rgb(var(--color-gold) / <alpha-value>)",
          light: "rgb(var(--color-gold-light) / <alpha-value>)",
        },
        neonBlue: {
          DEFAULT: "rgb(var(--color-neon-blue) / <alpha-value>)",
          light: "rgb(var(--color-neon-blue-light) / <alpha-value>)",
        },
        ivory: "rgb(var(--color-ivory) / <alpha-value>)",
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        // Shadcn UI colors
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [require("tailwindcss-animate")],
};
export default config;
