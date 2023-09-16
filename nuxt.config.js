import Prismic from '@prismicio/client'
import config from './plugins/head'
import linkResolver from './app/prismic/link-resolver'

require('dotenv').config()

async function routes () {
  const routes = []

  const api = await Prismic.client(process.env.PRISMIC_ROOT)

  const pages = await api.query([
    Prismic.Predicates.at('document.type', 'page')
  ])
  const workPages = await api.query([
    Prismic.Predicates.at('document.type', 'work_page')
  ])
  const miscPages = await api.query([
    Prismic.Predicates.at('document.type', 'page_misc')
  ])
  const works = await api.query([
    Prismic.Predicates.at('document.type', 'work')
  ])

  routes.push(...pages.results.map(doc => linkResolver(doc)))
  routes.push(...workPages.results.map(doc => linkResolver(doc)))
  routes.push(...miscPages.results.map(doc => linkResolver(doc)))
  routes.push(...works.results.map(doc => linkResolver(doc)))

  return routes
}

export default {
  ssr: false,
  target: 'static',
  server: {
    host: '0.0.0.0'
  },
  components: true,
  /**
  * Global head config
  */
  head: config(),
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-lazyload.js', ssr: false },
    { src: '~/plugins/meta', ssr: false },
    { src: '~/plugins/vue-intersect.js', ssr: false },
    { src: '~/plugins/vue-swiper.js', ssr: false }

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/prismic',
    '@nuxtjs/gtm',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/color-mode'
  ],
  eslint: {
    /* module options */
    fix: false
  },
  gtm: {
    id: 'GTM-K97V8VB'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    ['vue-scrollto/nuxt', { offset: 0 }]
  ],
  generate: {
    routes
  },
  sitemap: {
    hostname: 'https://magalireus.com',
    routes
  },
  /**
   * Prismic setup
   */
  prismic: {
    endpoint: process.env.PRISMIC_ROOT,
    modern: true
    // linkResolver: '~/plugins/prismic/link-resolver.js',
    // htmlSerializer: '~/plugins/prismic/html-serializer'
  },
  /*
  ** Build configuration
  */
  build: {
    /**
     * Nested PostCSS
     */
    postcss: {
      plugins: {
        'postcss-nested': {}
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend (config) {
      /*
      ** Allow Rich Text Fields
      */
      config.resolve.alias.vue$ = 'vue/dist/vue.esm.js'
      config.resolve.extensions = ['*', '.js', '.vue', '.json']
      /*
      ** SVG Support
      */
      // const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))

      // svgRule.test = /\.(png|jpe?g|gif|webp)$/

      // config.module.rules.push({
      //   test: /\.svg$/,
      //   loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
      // })
    }
  }
}
