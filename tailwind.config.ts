import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        noto: ['var(--font-noto)'],
      },
      colors: {
        veryPurple: '#873DFF',
        mediumPurple: '#BE96FF',
        lightPurple: '#DECAFF',
        lightGray: '#C9C9C9',
        veryRed: '#D40000',
        lightRed: '#FF8181',
        lightBlue: '#96BAFF',
        kakaoYellow: '#F9E000',
        inputGray: '#3A3A3A',
        progressGray: '#E5E5E5',
      },
      width: {
        mobile: '24.375rem',
      },
      height: {
        mobile: '52.75rem',
        navigation: '5.875rem',
      },
      animation: {
        fadeInDown: '0.5s ease 0s fadeInDown',
      },
      keyframes: {
        fadeInDown: {
          '0%': { height: '0', opacity: '0' },
          '100%': { height: 'fit', transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
