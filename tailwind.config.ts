import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ilga: {
          red: '#ED2929',
          orange: '#F76B1C',
          yellow: '#FFBB50',
          green: '#22B82B',
          blue: '#008EF0',
          purple: '#703CEE',
          black: '#212121',
          white: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
};
export default config;