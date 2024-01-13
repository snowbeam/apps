import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export const shadcnPlugin = plugin(
  // 1. Add CSS variable definitions to the base layer
  function ({ addBase }) {
    addBase({
      ":root": {
        "--background": "0 0% 100%",
        "--foreground": "240 10% 3.9%",
        "--muted": "240 4.8% 95.9%",
        "--muted-foreground": "240 3.8% 46.1%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "240 10% 3.9%",
        "--card": "0 0% 100%",
        "--card-foreground": "240 10% 3.9%",
        "--border": "240 5.9% 90%",
        "--input": "240 5.9% 90%",
        "--primary": "142.1 76.2% 36.3%",
        "--primary-foreground": "355.7 100% 97.3%",
        "--secondary": "240 4.8% 95.9%",
        "--secondary-foreground": "240 5.9% 10%",
        "--accent": "240 4.8% 95.9%",
        "--accent-foreground": "240 5.9% 10%",
        "--destructive": "0 84.2% 60.2%",
        "--destructive-foreground": "0 0% 98%",
        "--ring": "142.1 76.2% 36.3%",
        "--radius": "0.3rem"
      },
      ".dark": {
        "--background": "20 14.3% 4.1%",
        "--foreground": "0 0% 95%",
        "--muted": "0 0% 15%",
        "--muted-foreground": "240 5% 64.9%",
        "--popover": "0 0% 9%",
        "--popover-foreground": "0 0% 95%",
        "--card": "24 9.8% 10%",
        "--card-foreground": "0 0% 95%",
        "--border": "240 3.7% 15.9%",
        "--input": "240 3.7% 15.9%",
        "--primary": "142.1 70.6% 45.3%",
        "--primary-foreground": "144.9 80.4% 10%",
        "--secondary": "240 3.7% 15.9%",
        "--secondary-foreground": "0 0% 98%",
        "--accent": "12 6.5% 15.1%",
        "--accent-foreground": " 0 0% 98%",
        "--destructive": "0 62.8% 30.6%",
        "--destructive-foreground": "0 85.7% 97.3%",
        "--ring": "142.4 71.8% 29.2%"
      }
    });

    addBase({
      "*": {
        "@apply border-border": {}
      },
      body: {
        "@apply bg-background text-foreground": {}
      }
    });
  },

  // 2. Extend the Tailwind theme with "themable" utilities
  {
    theme: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1400px"
        }
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))"
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))"
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))"
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))"
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))"
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))"
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))"
          }
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)"
        },
        fontFamily: {
          sans: ["var(--font-sans)", ...fontFamily.sans],
          heading: ["var(--font-heading)", ...fontFamily.sans]
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" }
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" }
          }
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out"
        },
        aspectRatio: {
          poster: "3 / 4"
        }
      }
    }
  }
);
