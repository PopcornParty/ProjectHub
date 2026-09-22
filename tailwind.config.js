/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050508",
          900: "#07070b",
          800: "#0c0c14",
          700: "#12121c",
          600: "#1a1a28",
        },
        accent: {
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -12px rgba(168, 85, 247, 0.45)",
        card: "0 10px 40px -20px rgba(0,0,0,0.7)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgba(168,85,247,0.12), transparent 55%), radial-gradient(ellipse at bottom, rgba(59,130,246,0.06), transparent 50%)",
      },
    },
  },
  plugins: [],
};
