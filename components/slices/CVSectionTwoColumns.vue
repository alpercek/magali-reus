<template>
  <section class="cv_section">
    <Collapsible :is-open="isOpen" no-check icon-class="icon small">
      <prismic-rich-text
        slot="title"
        :field="slice.primary.title1"
        class="md:pr-2 tight text-magali"
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
    <Modal v-if="active"
    :active="active"
    :dx="this.dx"
    @close="closePreview"
    @scro="handleFade"
    @scrro="had">
      <div class="a">
        <div style="color: #725741;" class="fixed md:static top-3 w-full flex justify-center gap-14 text-4xl md:text-black md:text-base md:justify-end md:gap-4 zxcont">
          <a v-if="work.data.attachment.link_type !== 'Any'" class="md:absolute" :style="style" :href="work.data.attachment.url" target="_blank">
            
          </a>
          <div class="cursor-pointer select-none md:hidden" @click="closePreview">
            ✕
          </div>
        </div>
        <ImageColumn :images="work.data.body.filter(slice => slice.slice_type === 'image')" />
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
      dx: 100,
      dyy: 100,
      work: null,
      active: false,
      lastwork: null
    }
  },
  computed: {
    style () {
      return {
        left: `${this.dyy}px`,
        top: `${this.dx - 19}px`
      }
    }
  },
  mounted () {
    const elements = document.querySelectorAll('[data-type]')
    for (const element of elements) {
      element.onclick = this.openPreview
      element.style.textDecoration = 'underline'
    }
  },
  methods: {
    async openPreview (event) {
      if (!this.work) {
        const d = JSON.parse(event.currentTarget.dataset.data)
        this.dx = event.target.getBoundingClientRect().bottom
        this.dyy = event.target.getBoundingClientRect().left
        event.currentTarget.style.zIndex = '54'
        document.body.style.overflow = 'hidden'
        event.currentTarget.style.position = 'absolute'
        this.lastwork = event.currentTarget
        try {
          this.work = await this.$prismic.api.getByID(d.id)
          this.active = true
          if (this.work.data.attachment.link_type !== 'Any' && window.innerWidth > 640) {
            this.lastwork.style.paddingLeft = '12px'
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        this.work = false
      }
    },
    closePreview () {
      this.lastwork.style.zIndex = '0'
      this.lastwork.style.opacity = '1'
      this.lastwork.style.position = 'unset'
      this.lastwork.style.paddingLeft = '0px'
      document.body.style.overflow = 'auto'
      this.work = false
      this.active = false
    },
    handleFade () {
      this.lastwork.style.opacity = '0.1'
      document.getElementsByClassName('zxcont')[0].style.opacity = '0'
    },
    had () {
      this.lastwork.style.opacity = '1'
      document.getElementsByClassName('zxcont')[0].style.opacity = '1'
    }
  }
}
</script>
