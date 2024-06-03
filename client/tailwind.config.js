// tailwind.config.js
import { nextui } from "@nextui-org/react";
import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '375px', // Add this line for smaller mobile screens
      'sm': '640px', // Default Tailwind breakpoint
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  darkMode: "class",
  plugins: [nextui(),require("flowbite/plugin"),daisyui,],
};

export default config;
