/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.edge",
    "./resources/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors:{
        'light-gray':'#333',
        'success':'#63E6BE',
        'danger' :'#ff3838'
      }
    },
  },
  plugins: [],
}

