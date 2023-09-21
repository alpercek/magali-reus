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
        class="items"
      >
        <tbody>
          <tr
            v-for="row, j in slice.items"
            :key="j"
          >
            <td :class="{ small: $prismic.asText(row.column_1).length <= 5 }">
              <a
                v-if="row.file"
                target="_blank"
                :href="row.file.url"
              >
                <prismic-rich-text class="tight" :field="row.column_1" />
              </a>
              <prismic-rich-text
                v-else
                class="tight"
                :field="row.column_1"
              />
            </td>
            <td>
              <a
                v-if="row.file"
                target="_blank"
                :href="row.file.url"
              >
                <prismic-rich-text class="tight" :field="row.column_2" />
              </a>
              <prismic-rich-text
                v-else
                class="tight"
                :field="row.column_2"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Collapsible>
    <!-- Modal -->
    <Modal v-if="active" :active="active" @close="closePreview">
      <div class="a">
        <ImageColumn :images="work.data.body.filter(slice => slice.slice_type === 'image')" />
        <a v-if="work.data.attachment.link_type !== 'Any'" class="mx-4 sm:mx-0 block underline mt-8" :href="work.data.attachment.url" target="_blank">
           Download pdf
        </a>
      </div>
    </Modal>
  </section>
</template>

<script>
import Collapsible from '@/components/Collapsible.vue'
import Modal from '@/components/Modal.vue'
import ImageColumn from '@/components/ImageColumn.vue'

export default {
  name: 'CVSectionSimple',
  components: { Collapsible, Modal, ImageColumn },
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
      work: null,
      active: false
    }
  },
  mounted () {
    const elements = document.querySelectorAll('[data-type]')
    const moreelements = document.getElementsByClassName('vue-pdf-embed')
    for (const element of elements) {
      element.onclick = this.openPreview
    }
    for (let index = 0; index < moreelements.length - 1; index++) {
      moreelements[index].remove()
    }
  },
  methods: {
    async openPreview (event) {
      if (!this.work) {
        const d = JSON.parse(event.currentTarget.dataset.data)

        try {
          this.work = await this.$prismic.api.getByID(d.id)
          this.active = true
        } catch (error) {
          console.error(error)
        }
      } else {
        this.work = false
      }
    },
    closePreview () {
      this.work = false
      this.active = false
    }
  }
}
</script>