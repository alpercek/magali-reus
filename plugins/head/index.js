/**
 * M = Meta
 */
const m = {
  viewport: 'width=device-width, initial-scale=1',
  title: 'Magali Reus',
  description: 'Magali Reus, Born 1981, The Hague, The Netherlands. Lives and works in London',
  url: 'https://magalireus.com',
  color: '#fff',
  keywords: 'art, sculpture, hague',
  image: '',
  width: 0,
  height: 0
}

const config = (pref = 'light') => {
  return {
    title: m.title,
    titleTemplate: `%s : ${m.title}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: m.viewport },
      { hid: 'description', name: 'description', content: m.description },
      { hid: 'theme-color', name: 'theme-color', content: m.color },
      { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: m.color },
      { hid: 'keywords', name: 'keywords', content: m.keywords },
      // <!-- Open Graph / Facebook -->
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: m.url },
      { hid: 'og:title', property: 'og:title', content: m.title },
      { hid: 'og:description', property: 'og:description', content: m.description },
      { hid: 'og:image', property: 'og:image', content: m.image },
      { hid: 'og:image:width', property: 'og:image:width', content: m.width },
      { hid: 'og:image:height', property: 'og:image:height', content: m.height },

      // <!-- Twitter -->
      { hid: 'twitter.card', name: 'twitter.card', content: 'summary_large_image' },
      { hid: 'twitter.url', name: 'twitter.url', content: m.url },
      { hid: 'twitter.title', name: 'twitter.title', content: m.title },
      { hid: 'twitter.description', name: 'twitter.description', content: m.description },
      { hid: 'twitter.image', name: 'twitter.image', content: m.image },
      { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: m.color }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `/${pref}/favicon.ico` },
      { rel: 'apple-touch-icon', href: `/${pref}/apple-touch-icon.png`, sizes: '180x180' },
      { rel: 'icon', type: 'image/png', href: `/${pref}/favicon-32x32.png`, sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: `/${pref}/favicon-16x16.png`, sizes: '16x16' }
      // { rel: 'manifest', href: '/site.webmanifest' }
    ]
  }
}

module.exports = config
