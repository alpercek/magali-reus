<template>
  <div
    v-if="!$fetchState.pending"
    class="page"
  >
    <HomeSlices :slices="page.data.body" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HomeSlices from '@/components/slices/HomeSlices'

export default {
  name: 'UID',
  components: {
    HomeSlices
  },
  data () {
    return {
      page: null
    }
  },
  async fetch () {
    this.page = await this.$prismic.api.getSingle('series_index')
  },
  head () {
    return {
      title: 'Series'
    }
  },
  computed: mapState(['main'])
}
</script>
