/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // paths to JavaScript or TypeScript files
    './views/**/*.ejs' // paths to template files, if using EJS as template engine
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

