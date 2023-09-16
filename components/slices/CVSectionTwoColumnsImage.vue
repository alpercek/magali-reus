<template>
  <section class="cv_section">
    <Collapsible :is-open="isOpen" no-check icon-class="icon small">
      <prismic-rich-text
        slot="title"
        :field="slice.primary.title1"
        class="md:pr-2 tight text-magali "
      />
      <table
        slot="content"
        class="items mb-4"
      >
        <tbody>
          <tr
            v-for="row in slice.items"
            :key="$prismic.asText(row.column1)"
            class="cursor-pointer"
            @mouseenter="setPreviewing(row.image.url)"
          >
            <td :class="{ small: $prismic.asText(row.column_1).length <= 5 }">
              <prismic-rich-text :field="row.column_1" class="tight" />
            </td>
            <td>
              <prismic-rich-text :field="row.column_2" class="tight" />
            </td>
          </tr>
        </tbody>
      </table>
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
