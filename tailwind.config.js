const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    screens: {
      xs: '400px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif'],
      },
      backgroundImage: {
        galaxy: 'url("/background-galaxy.png")',
        gradient: 'linear-gradient(90deg, #9572FC 10%, #43E7AD 70%, #E1D55D 100%)',
        'game-card-text': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 65%);',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('state', '&[data-state="on"]');
    }),
  ],
};
