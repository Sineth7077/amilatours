
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* legacy safari colors removed and replaced with premium brand palette below */
        // Premium brand palette
        brand: {
          forest: "#173D32",
          deep: "#0F2B23",
          ivory: "#F7F4EC",
          charcoal: "#202622",
          sand: "#D9C8AA",
          mist: "#EBE5D7", // soft divider / section tint
          rose: "#C04A45",
          sage: "#6B8F73",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "Cambria", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Premium entrance animations
        heroFadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        cardStagger: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        subtleScale: {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 1s ease-in forwards",
        fadeUp: "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        heroFadeIn: "heroFadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        cardStagger: "cardStagger 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        subtleScale: "subtleScale 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
