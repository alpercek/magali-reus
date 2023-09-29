<template>
  <div class="announcements">
    <prismic-rich-text class="px-4 sm:px-0" ref="main" :field="field" />
    <div v-if="!!work" :key="work.id" class="py-8">
      <SimpleSlider
        :uid="work"
        :slides="work.data.body"
      />
    </div>
  </div>
</template>

<script>
import PrismicDom from 'prismic-dom'
// import Slider from '@/components/Slider.vue'

export default {
  name: 'Announcements',
  // components: { Slider },
  props: {
    field: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      PrismicDom,
      hasMounted: false,
      work: null
    }
  },
  computed: {
    asHtml () {
      return PrismicDom.RichText.asHtml
    }
  },
  mounted () {
    const elements = document.querySelectorAll('[data-type]')

    for (const element of elements) {
      element.onclick = this.openPreview
      element.style.textDecoration = 'underline'
    }
  },
  beforeDestroy () {
    const elements = document.querySelectorAll('[data-type]')

    for (const element of elements) {
      element.removeEventListener('click', this.openPreview)
    }
  },
  methods: {
    async openPreview (event) {
      const d = JSON.parse(event.currentTarget.dataset.data)

      try {
        this.work = await this.$prismic.api.getByID(d.id)
      } catch (error) {
        console.error(error)
      }
    },
    closePreview () {
      this.work = false
    }
  }
}
</script>

<style>
  .announcements span.cursor-pointer:hover {
    @apply text-magali;
  }
</style>
