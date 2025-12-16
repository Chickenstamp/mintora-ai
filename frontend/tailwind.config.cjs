/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mintora: {
          red: "#FF2E3D",         // primary brand red
          redDark: "#E12633",
          midnight: "#0B0F14",    // page bg
          ink: "#0F1216",         // card bg
          foam: "#F9FAFB",        // light text bg
          gray: {
            100: "#F4F6F8",
            200: "#E6E8EB",
            300: "#C9CDD2",
            400: "#A8AFB6",
            500: "#8C949C",
            600: "#707983",
            700: "#515A64",
            800: "#2E353D",
            900: "#171C21"
          }
        }
      },
      boxShadow: {
        glow: "0 10px 40px rgba(255,46,61,.25)"
      }
    }
  },
  plugins: [],
};
