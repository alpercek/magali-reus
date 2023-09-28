/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  important: true,
  theme: {
    fontFamily: {
      serif: ['ABC Arizona Mix']
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16'
    },
    extend: {
      colors: {
        magali: 'var(--color-magali)'
      },
      animation: {
        pulse: 'pulse 5s ease-in-out infinite',
      }
    }
    // fontSize: {
    //   xs: '.75rem',
    //   sm: '.875rem',
    //   tiny: '.875rem',
    //   base: '12pt',
    //   lg: '1.125rem',
    //   xl: '1.25rem',
    //   '2xl': '1.5rem',
    //   '3xl': '1.875rem',
    //   '4xl': '2.25rem',
    //   '5xl': '3rem',
    //   '6xl': '4rem',
    //   '7xl': '5rem'
    // },
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
}
