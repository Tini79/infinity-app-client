import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bs-primary": "#730141",
        "bs-primary--darker": "#3A0121",
        "bs-secondary": "#FFEEAB",
        "bs-secondary--lighter": "#FFF8DD",
        "bs-secondary--less-darker": "#FEDC56",
        "bs-secondary--darker": "#FEE378",
        "bs-third": "#675823",
        "bs-third--lighter": "#E1DED3",
        "bs-fourth": "#332C11"
      },
      backgroundImage: {
        "homepage-hero": "url('/public/imgs/hero.jpg')"
      },
      screens: {
        "xs": "576px"
      }
    },
  },
  plugins: [],
};
export default config;
