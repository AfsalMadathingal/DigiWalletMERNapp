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
  },
  darkMode: "class",
  plugins: [nextui(),require("flowbite/plugin"),daisyui,],
};

export default config;
