<template>
  <section class="cv_section">
    <Collapsible
      :is-open="isOpen"
      no-check
      icon-class="icon"
    >
      <prismic-rich-text
        v-if="slice.primary.title1"
        slot="title"
        :field="slice.primary.title1"
        class="md:pr-2 text-magali "
      />
      <div slot="content" class="hover:text-magali">
        <a
          v-for="item in slice.items"
          :key="item.file.url"
          :href="item.file.url"
          target="_blank"
        >
          <prismic-rich-text class="inner-content" :field="prepend(item).text" />
        </a>
      </div>
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
  },
  methods: {
    prepend (field) {
      const copy = JSON.parse(JSON.stringify(field))
      copy.text[0].text = ` ${copy.text[0].text}`
      return copy
    }
  }
}
</script>
