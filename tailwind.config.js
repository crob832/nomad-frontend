/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f8fafc",
        "paper-alt": "#eef4ff",
        ink: "#0f172a",
        "ink-elev": "#111827",
        "ink-soft": "#334155",
        "ink-muted": "#64748b",
        "ink-subtle": "#94a3b8",
        "border-default": "#cbd5e1",
        "border-strong": "#94a3b8",
        brand: "#1d4ed8",
        "brand-strong": "#1e40af",
        accent: "#22d3ee",
        "accent-soft": "#cffafe"
      },
      fontFamily: {
        serif: ["'Playfair Display'", "ui-serif", "Georgia", "serif"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
