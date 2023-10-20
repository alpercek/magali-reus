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
    @freeze="fixtitle"
    @melt="absolutetitle"
    >
      <div class="a">
        <div :style="style" style="position: absolute; transform: translate(0, -21px);" class="hidden md:flex italic text-base underline zxcont">
          <a v-if="work.data.attachment.link_type !== 'Any'" :href="work.data.attachment.url" target="_blank">
            
          </a>
          <div class="title hidden md:block">{{ this.lastwork.innerText }}</div>
          <div class="cursor-pointer select-none md:hidden" @click="closePreview">
            ✕
          </div>
        </div>
        <div style="color: #725741;" class="fixed md:hidden top-3 w-full flex justify-center gap-14 text-4xl">
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
        top: `${this.dx}px`
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
        document.body.style.overflow = 'hidden'
        this.lastwork = event.currentTarget
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
      document.body.style.overflow = 'auto'
      this.work = false
      this.active = false
    },
    fixtitle () {
      document.getElementsByClassName('zxcont')[0].style.top = '24px'
      document.getElementsByClassName('zxcont')[0].style.position = 'fixed'
    },
    absolutetitle () {
      document.getElementsByClassName('zxcont')[0].style.top = ''
      document.getElementsByClassName('zxcont')[0].style.position = 'absolute'
    }
  }
}
</script>
<style>
.title{
  tab-size: 4;
    -webkit-text-size-adjust: 100%;
    --left-col-width: 500px;
    --nav-collapsed-width: 80px;
    --nav-width: 260px;
    --slider-caption-height: 40px;
    --slider-image-height: 700px;
    --slider-height: 740px;
    --color-magali: #ff932f;
    line-height: inherit;
    text-indent: 0;
    border-collapse: collapse;
    letter-spacing: -0.3px;
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    --tw-border-opacity: 1;
    border-color: rgba(229, 231, 235, var(--tw-border-opacity));
    --tw-shadow: 0 0 rgba(0,0,0,0);
    --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgba(59, 130, 246, 0.5);
    --tw-ring-offset-shadow: 0 0 rgba(0,0,0,0);
    --tw-ring-shadow: 0 0 rgba(0,0,0,0);
    -webkit-font-smoothing: antialiased;
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    font-family: ABC Arizona Mix;
    cursor: pointer !important;
    text-decoration: underline;
}
</style>
