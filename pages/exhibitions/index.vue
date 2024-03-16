<template>
  <div
    v-if="!$fetchState.pending"
    class="page px-4 md:px-0"
  >
  <TextualSlices :body="slices" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TextualSlices from '@/components/slices/TextualSlices.vue'

export default {
  name: 'UID',
  components: {
    TextualSlices
  },
  data () {
    return {
      page: null,
      slices: []
    }
  },
  async fetch () {
    this.page = await this.$prismic.api.getSingle('exhibitions_index')
    const slices = this.page.data.body.map((slice) => {
      if (slice.primary.title1) {
        return {
          ...slice,
          title: this.$prismic.asText(slice.primary.title1),
          id: this.$prismic.asText(slice.primary.title1).toLowerCase().replace(' ', '-')
        }
      } else {
        return slice
      }
    })
    this.slices = slices
    this.setSub(slices)
  },
  head () {
    return {
      title: 'Exhibitions'
    }
  },
  computed: mapState(['main']),
  mounted () {
    const keykey = window.location.href.split('?')[1]
    setTimeout(() => {
      document.getElementsByClassName(keykey)[1].click()
    }, 1000)
  }
}
</script>
