/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        primary: '#2e86de'
      },
      animation: {
        fadeUp: 'fadeUp .8s ease'
      },
      keyframes: {
        fadeUp: {
          '0%' : {
            opacity: 0,
            transform: 'translateY(15px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      }
    },
  },
  plugins: [],
}

