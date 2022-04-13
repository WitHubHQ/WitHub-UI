module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './.storybook/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /./,
    },
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        ironMaiden: {
          primary: '#006FFF',
          secondary: '#595F72',
          accent: '#F68A51',
          neutral: '#1a2d3c',
          'base-100': '#011627',
          info: '#2F89FF',
          success: '#0FFF95',
          warning: '#F2AF29',
          error: '#DB504A',
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
  plugins: [require('daisyui')],
}
