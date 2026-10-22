/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#2d6a4f',
        'light-green': '#95d5b2',
        'bg-green': '#f0fdf4',
        'warning-amber': '#f59e0b',
        'danger-red': '#ef4444',
      }
    },
  },
  plugins: [],
}