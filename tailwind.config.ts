import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        bg: "#0a0a0f",
        surface: "#12121a",
        surface2: "#1c1c28",
        accent: "#00f5a0",
        purple: "#7c3aed",
        amber: "#f59e0b",
        danger: "#ef4444",
        blue: "#3b82f6",
      },
      animation: {
        "fade-up": "fadeUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "pulse-glow": "pulseGlow 2s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 10px rgba(0,245,160,0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(0,245,160,0.5)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
