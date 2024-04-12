import defaultTheme from 'tailwindcss'
import typography from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        blue: '#32b5eb',
        'blue-dark': '#11475E',
      },
    },
  },
  plugins: [typography],
}
