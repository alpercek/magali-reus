<template>
  <section
    class="cv_section"
  >
    <Collapsible :is-open="isOpen" no-check icon-class="icon small">
      <prismic-rich-text
        v-if="$prismic.asText(slice.primary.title1) !== ''"
        slot="title"
        :field="slice.primary.title1"
        class="md:pr-2 tight text-magali "
      />
      <prismic-rich-text
        slot="content"
        class="paragraph tight"
        :field="slice.primary.text"
      />
    </Collapsible>
  </section>
</template>

<script>
import Collapsible from '@/components/Collapsible.vue'

export default {
  name: 'CVSectionSimple',
  components: { Collapsible },
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
  }
}
</script>
