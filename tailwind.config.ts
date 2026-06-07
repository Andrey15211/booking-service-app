import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#11100e",
        ivory: "#f3eee5",
        sand: "#d8cbb8",
        gold: "#b6935c",
        smoke: "#777067"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"]
      },
      boxShadow: {
        soft: "0 24px 60px rgba(17, 16, 14, 0.10)"
      }
    }
  },
  plugins: []
} satisfies Config;
