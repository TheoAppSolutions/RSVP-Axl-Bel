import type { Config } from "tailwindcss";

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const dusty = Object.fromEntries(shades.map((shade) => [shade, `rgb(var(--dusty-${shade}) / <alpha-value>)`]));

const config: Config = {
  content: ["./app/admin/**/*.{ts,tsx}"],
  important: "#rsvp-admin",
  corePlugins: { preflight: false },
  theme: { extend: { colors: { dusty }, fontFamily: { serif: ["var(--font-display)"], sans: ["var(--font-utility)"] } } },
  plugins: [],
};
export default config;
