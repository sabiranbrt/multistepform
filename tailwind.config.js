// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}','./App.tsx'],
  theme: {
    colors: {
        primary:{
          DEFAULT:"#5081B9"
        },
      },
    extend: {
    
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontSize: {
        xxs: '0.625rem',
      },
    },
  },
  plugins: [],
};
