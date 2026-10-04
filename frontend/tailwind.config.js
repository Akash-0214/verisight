const path = require('path');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07111f',
        panel: '#0d1b2a',
        accent: '#3dd9b3',
        accentSoft: '#7de4d1',
        danger: '#ff6b6b',
        text: '#dfe8f3',
        muted: '#8ca1b7'
      },
      boxShadow: {
        glow: '0 0 30px rgba(61, 217, 179, 0.22)'
      }
    }
  },
  plugins: []
};
