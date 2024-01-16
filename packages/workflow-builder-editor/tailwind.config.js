import { shadcnPreset } from "@snowbeam/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["shared/**/*.{ts,tsx,js,jsx,mdx}", "src/**/*.{ts,tsx,js,jsx,mdx}"],
  darkMode: "class",
  prefix: "workflow-builder-editor",
  presets: [shadcnPreset],
  theme: {
    extend: {}
  },
  plugins: []
};
