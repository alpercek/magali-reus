<template>
  <section class="cv_section">
    <Collapsible
      v-if="!$fetchState.pending"
      :is-open="isOpen"
      no-check
      icon-class="icon small"
    >
      <prismic-rich-text
        slot="title"
        class="md:pr-2 pb-4 mb:pb-[29px] text-magali "
        :field="slice.primary.title1"
      />
      <div
        slot="content"
        class="items"
      >
        <div
          :is="$route.path === '/' ? 'nuxt-link' : 'div'"
          v-for="(p, i) in items"
          :key="p.id + i + 'title'"
          to="/books-n-other"
          class="hover:text-magali cursor-pointer mb-12 mb:mb-[40px] block"
          @mouseenter="parentStartAutoplay(i, true)"
          @mouseleave="parentStartAutoplay(i, false)"
        >
          <div v-if="p.data.slides.length > 0" class="w-full slider-container">
            <SliderBook
              ref="childRef"
              :slides="p.data.slides"
              :uid="p.id"
            />
          </div>
          <prismic-rich-text :field="p.data.title" class="tight italic md:mt-2" />
          <prismic-rich-text :field="p.data.description" class="tight" />
        </div>
      </div>
    </Collapsible>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SliderBook from '@/components/SliderBook.vue'

export default {
  name: 'CVSectionSimple',
  components: { SliderBook },
  props: {
    slice: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      items: [],
      timeoutId: null,
      autoplay: false
    }
  },
  async fetch () {
    const publications = await this.$prismic.api.getByIDs(this.slice.items.map(i => i.publication.id), { pageSize: 100 })
    const items = this.slice.items.map(i => publications.results.find(p => p.id === i.publication.id))
    this.items = items
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    parentStartAutoplay (i, state) {
      this.$refs.childRef[i].startAutoplay(state)
    },
    ...mapActions({ setPreviewing: 'main/SET_PREVIEWING' }),
    enes (p) {
      this.timeoutId = window.setTimeout(() => {
        this.setPreviewing(p)
      }, 500)
    },
    sene () {
      window.clearTimeout(this.timeoutId)
    }
  }
}
</script>
