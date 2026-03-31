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
        "bg-primary": "#FFF8F0",
        "bg-secondary": "#FFE8E0",
        "accent-primary": "#FF8FAB",
        "accent-secondary": "#FFCB77",
        "text-primary": "#3D2C2C",
        "text-secondary": "#9B7373",
        "locked-bg": "#E8E0D8",
        "cat-accent": "#C4A882",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "float-up": {
          "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0.3" },
          "10%": { opacity: "0.15" },
          "90%": { opacity: "0.15" },
          "100%": { transform: "translateY(-100px) rotate(360deg)", opacity: "0" },
        },
        "pulsing-glow": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(255, 143, 171, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 143, 171, 0.6)" },
        },
        blink: {
          "0%, 90%, 100%": { transform: "scaleY(1)" },
          "95%": { transform: "scaleY(0.1)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        "float-up": "float-up linear infinite",
        "pulsing-glow": "pulsing-glow 2s ease-in-out infinite",
        blink: "blink 4s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
