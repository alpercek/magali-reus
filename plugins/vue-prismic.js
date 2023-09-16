import Vue from 'vue'
import PrismicVue from 'prismic-vue'
import linkResolver from '~/app/prismic/link-resolver'
import htmlSerializer from '~/app/prismic/html-serializer'

// Add this before the new Vue instance
Vue.use(PrismicVue, {
  // endpoint: process.env.PRISMIC_ROOT || process.env.prismicRoot,
  endpoint: process.env.PRISMIC_ROOT,
  linkResolver,
  htmlSerializer
})
