<template>
  <div
    v-if="!$fetchState.pending"
    class="page"
  >
    <WorkSlider has-document :work="page" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WorkSlider from '@/components/slices/WorkSlider.vue'

export default {
  name: 'UID',
  components: {
    WorkSlider
  },
  data () {
    return {
      page: null
    }
  },
  async fetch () {
    this.page = await this.$prismic.api.getByUID('work', this.$route.params.uid)
  },
  head () {
    if (this.page) {
      return {
        title: this.$prismic.asText(this.page.data.title)
      }
    } else { return { title: 'Loading' } }
  },
  computed: mapState(['main'])
}
</script>
