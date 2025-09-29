import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Define our "Accessible Classic" color palette
      colors: {
        background: "#FDFDFD", // Warm off-white
        primary: {
          DEFAULT: "#192A51", // Navy blue for text
          light: "#2d4b8f",
        },
        secondary: {
          DEFAULT: "#E5A000", // Rich ochre for actions
          dark: "#c28800",
        },
        border: "#D1D5DB", // A neutral grey for borders
      },
      // Define our custom font families using the variables from layout.tsx
      fontFamily: {
        sans: ["var(--font-plex-sans)", "sans-serif"],
        serif: ["var(--font-plex-serif)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;