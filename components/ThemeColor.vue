<template>
  <div class="hidden" />
</template>

<script>
export default {
  name: 'ThemeColor',
  data () {
    return {
      document: null
    }
  },
  watch: {
    $route (to, from) {
      this.setColor(this.$route.name)
    }
  },
  mounted () {
    this.root = document.documentElement
    this.setColor(this.$route.name)
    // this.root.style.setProperty('--color-magali', this.home.data.color)
  },
  methods: {
    async setColor (key) {
      this.root.style.setProperty('--color-magali', '#000')
      let document = await this.$prismic.api.getSingle('home')
      const defaultColor = document.data.color
      switch (key) {
        case ('uid'):
          document = await this.$prismic.api.getByUID('page', this.$route.params.uid)
          break
        case ('series'):
          document = await this.$prismic.api.getSingle('series_index')
          break
        case ('series-uid'):
          document = await this.$prismic.api.getByUID('work_page', this.$route.params.uid)
          break
        default:
          break
      }
      if (document.data.color) {
        this.root.style.setProperty('--color-magali', document.data.color)
      } else {
        this.root.style.setProperty('--color-magali', defaultColor)
      }
    }
  }
}
</script>
