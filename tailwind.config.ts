import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   "#0a0a0f",
          secondary: "#0d0d18",
          card:      "#12121e",
          border:    "#1e1e35",
        },
        neon: {
          purple: "#8b5cf6",
          blue:   "#3b82f6",
          indigo: "#7c3aed",
          royal:  "#2563eb",
          light:  "#93c5fd",
          lilac:  "#c4b5fd",
        },
      },
      fontFamily: {
        sans: ["'Nunito'", "sans-serif"],
        display: ["'Nunito'", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        float:        "float 3s ease-in-out infinite",
        "neon-flicker": "neon-flicker 4s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%":   { boxShadow: "0 0 5px #8b5cf6, 0 0 20px #8b5cf640" },
          "100%": { boxShadow: "0 0 10px #8b5cf6, 0 0 40px #8b5cf660, 0 0 80px #8b5cf620" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "neon-flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            textShadow: "0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 40px #8b5cf6",
          },
          "20%, 24%, 55%": { textShadow: "none", opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
