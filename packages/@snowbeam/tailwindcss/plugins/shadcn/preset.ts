import typographyPlugin from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

import { shadcnPlugin } from "plugins/shadcn/shadcn";

export const shadcnPreset = {
  content: [],
  darkMode: ["class"],
  plugins: [animatePlugin, typographyPlugin, shadcnPlugin]
} satisfies Config;
