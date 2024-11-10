/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // Ensures Tailwind scans your HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind scans all files in the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
}


