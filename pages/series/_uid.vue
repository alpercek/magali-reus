<template>
  <div
    v-if="!$fetchState.pending"
    class="page"
  >
    <WorkSlices :slices="page.data.body" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import WorkSlices from '@/components/slices/WorkSlices'

export default {
  name: 'UID',
  components: {
    WorkSlices
  },
  beforeRouteLeave (to, from, next) {
    this.setPreviewing(false)
    this.setSub([])
    next()
  },
  data () {
    return {
      page: null
    }
  },
  async fetch () {
    this.page = await this.$prismic.api.getByUID('work_page', this.$route.params.uid)

    // knaves-shuffle-courts-2021
    const subs = await Promise.all(this.page.data.body.map(async (slice) => {
      const work = await this.$prismic.api.getByID(slice.primary.work.id)

      return {
        ...slice,
        title: this.$prismic.asText(work.data.title),
        id: work.uid
      }
    }))

    this.setSub(subs)
  },
  head () {
    if (this.page) {
      return {
        title: this.$prismic.asText(this.page.data.title)
      }
    } else { return { title: 'Loading' } }
  },
  computed: mapState(['main']),
  methods: mapActions({
    setSub: 'main/SET_SUB',
    setPreviewing: 'main/SET_PREVIEWING'
  })
}
</script>
