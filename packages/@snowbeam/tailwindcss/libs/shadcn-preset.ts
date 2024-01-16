import type { Config } from "tailwindcss";
import typographyPlugin from "@tailwindcss/typography";
import animatePlugin from "tailwindcss-animate";

import { shadcnPlugin } from "../plugins/shadcn";

export const shadcnPreset = {
  content: [],
  plugins: [animatePlugin, typographyPlugin, shadcnPlugin]
} satisfies Config;
