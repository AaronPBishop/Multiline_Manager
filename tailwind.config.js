/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounce_small: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(0) scale(0.3)' },
        },
      },
      animation: {
        bounce_small: 'bounce_small 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}