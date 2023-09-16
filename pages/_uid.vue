<template>
  <div
    v-if="!$fetchState.pending"
    :style="`:root { --window-width: ${window.width}px }`"
    class="page flex flex-wrap md:flex-nowrap overflow-x-hidden px-4 md:px-0"
  >
    <div
      class="float-left w-full left-column"
    >
      <TextualSlices :body="slices" />
    </div>

    <div
      v-if="main.previewing"
      class="float-left right-column hidden md:inline-block fixed top-0 right-0 mt-24"
    >
      <transition
        name="fade"
        mode="out-in"
      >
        <PreviewElement
          :key="main.previewing.uid"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import utils from '@/mixins/utils'
import TextualSlices from '@/components/slices/TextualSlices.vue'
import PreviewElement from '@/components/PreviewElement.vue'

export default {
  name: 'UID',
  components: {
    TextualSlices,
    PreviewElement
  },
  mixins: [utils],
  beforeRouteLeave (to, from, next) {
    this.setPreviewing(false)
    this.setSub([])
    next()
  },
  data () {
    return {
      page: null,
      slices: []
    }
  },
  async fetch () {
    this.page = await this.$prismic.api.getByUID('page', this.$route.params.uid)
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
    if (this.page) {
      return {
        title: this.$prismic.asText(this.page.data.title)
      }
    } else { return { title: 'Loading' } }
  },
  computed: {
    ...mapState(['main'])
  },
  async mounted () {
    this.page = await this.$prismic.api.getByUID('page', this.$route.params.uid)
  },
  methods: mapActions({
    setSub: 'main/SET_SUB',
    setPreviewing: 'main/SET_PREVIEWING'
  })
  // mounted () {
  // window.addEventListener('resize', function () { location.reload() })
  // }
}
</script>

<style lang="postcss">
.page {
  width: calc(var(--window-width) - var(--nav-width) - 20px);
}

.left-column {
  flex-basis: 100%;
  flex-shrink: 0;
}

@screen md {
  .left-column {
    /* flex-basis: 500px; */
  }
}

.right-column {
  flex-basis: 100%;
  flex-shrink: 1;
  width: calc(100vw - var(--left-col-width) - var(--nav-width));
}
</style>
