/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#333333',
      },  
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      


    },
  },
  plugins: [],
}

