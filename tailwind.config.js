/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        australia: ['"Playwrite AU VIC Guides"', 'cursive'],
        italica: ['"Playwrite AU VIC Guides"', 'cursive']
      },
    }
  },
  plugins: [],
}