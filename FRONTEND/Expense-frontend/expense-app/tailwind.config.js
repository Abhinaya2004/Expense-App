/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        greenish: '#626F47',
        bgColor:'#FEFAE0',
        cColor: '#F2EED7',
        bColor: '#798645' // Add your custom color
      },
    },
  },
  plugins: [],
}