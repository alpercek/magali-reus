import Vue from 'vue'

const pages = {
  index: {
    title: 'Home',
    meta: [
      { hid: 'theme-color', name: 'theme-color', content: '#000000' }
    ]
  }
}

Vue.prototype.$metaForAll = (page) => {
  return pages[page]
}
