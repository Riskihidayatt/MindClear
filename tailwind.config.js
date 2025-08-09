/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        burn: "burn 2s ease-in-out forwards",
        float: "float 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-in forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        burn: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "50%": {
            opacity: "0.7",
            transform: "scale(1.02)",
            filter: "brightness(1.5)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(0.8)",
            filter: "blur(2px)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },
      colors: {
        "warm-gray": {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
