/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorQuestionnaire: {
          light: "#F8E9FE",
          DEFAULT: "#C433FF"
        },
        colorContent: {
          light: "#FDE2E1",
          DEFAULT: "#DD302F"
        },
        colorArticle: {
          light: "#DCFCE6",
          DEFAULT: "#3FB163"
        },
        colorQdj: {
          light: "#ECF2FE",
          DEFAULT: "#4988FE"
        },
        colorTestimony: {
          light: "#FEFCEC",
          DEFAULT: "#FFE83D"
        },
        colorWhite: "#FFFFFF"
      },
    },
  },
  plugins: [],
}
