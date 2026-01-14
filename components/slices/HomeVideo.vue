<template>
  <div v-if="!$fetchState.pending" v-intersect="{ onChange: handleIntersection }" class="outer-container">
    <video
  autoplay
  muted
  playsinline
  loop
  class="w-full md:pr-6 2xl:pr-0 2xl:w-5/6 max-w-6xl h-auto"
>
  <source :src="video" type="video/mp4" />
  Your browser does not support the video tag.
</video></div>
</template>

<script>
export default {
  name: 'HomeVideo',
  data () {
    return {
      video: null,
      page: null
    }
  },
  async fetch () {
    this.page = await this.$prismic.api.getSingle('home')
    const videoObject = this.page.data.body.find(item => item.primary && item.primary.video)
    if (videoObject) {
      this.video = videoObject.primary.video.url
    }
  },
  methods: {
    handleIntersection (isIntersecting) {
      if (isIntersecting) {
        this.$emit('visible')
      }
    }
  }
}
</script>
