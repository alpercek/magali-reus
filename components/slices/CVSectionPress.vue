<template>
  <section class="cv_section">
    <Collapsible :is-open="isOpen" no-check icon-class="icon small">
      <prismic-rich-text
        slot="title"
        :field="slice.primary.title1"
        class="md:pr-2 text-magali "
      />
      <div slot="content">
        <table
          v-for="row in slice.items"
          :key="$prismic.asText(row.title1)"
          class="items"
        >
          <tbody>
            <tr>
              <td :class="{ small: $prismic.asText(row.year).length <= 5 }">
                <prismic-rich-text :field="row.year" />
              </td>
              <td>
                <prismic-rich-text :field="row.title1" class="tight" />
              </td>
            </tr>
          </tbody>
        </table>
        <prismic-rich-text
          :key="`a${row.title1}`"
          class="ml-6 md:ml-0 tight"
          :field="row.paragraph"
        />
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
  }
}
</script>

<style lang="postcss">
  span.cursor-pointer:hover {
    @apply text-magali;
  }
</style>
