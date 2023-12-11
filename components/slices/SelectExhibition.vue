<template>
  <section class="cv_section">
      <prismic-rich-text
        slot="title"
        :field="slice.primary.title1"
        class="md:pr-2 tight text-magali pb-9"
        style="font-weight: bold;"
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
            <td class="hidden" :class="{ small: $prismic.asText(row.column_1).length <= 5 }">
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
               <div class="flex"> <a class="cursor-pointer pr-2.5 text-magali hidden md:block" @click="downloadPreview($event)"></a>
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
            </div>
            </td>
          </tr>
        </tbody>
      </table>
    <!-- Modal -->
    <transition name="fade">
    <Modal v-if="active"
    :active="active"
    :dx="this.dx"
    @close="closePreview"
    @freeze="fixtitle"
    @melt="absolutetitle"
    >
      <div class="a">
        <div class="cursor-pointer select-none text-5xl absolute left-1/2 hidden md:block text-magali" style="transform: translate(0px,-92px);" @click="closePreview">
            ✕
          </div>
        <div :style="style" style="position: absolute; transform: translate(0, -21px);" class="hidden md:flex text-base zxcont">
          <a v-if="work.data.attachment.link_type !== 'Any'" class="pr-2.5 text-magali" :href="work.data.attachment.url" target="_blank">
            
          </a>
          <div class="title hidden md:block no-underline">{{ this.lastwork.innerText }}</div>
        </div>
        <div style="color: #725741;" class="fixed md:hidden top-3 w-full flex justify-center gap-14 text-4xl">
          <a v-if="work.data.attachment.link_type !== 'Any'" class="md:absolute" :style="style" :href="work.data.attachment.url" target="_blank">
            
          </a>
          <div class="cursor-pointer select-none md:hidden" @click="closePreview">
            ✕
          </div>
        </div>
        <ImageColumn :images="work.data.body.filter(slice => slice.slice_type === 'image')" class="pt-1" />
      </div>
    </Modal>
  </transition>
  </section>
</template>

<script>
import Modal from '@/components/Modal.vue'
import ImageColumn from '@/components/ImageColumn.vue'

export default {
  name: 'CVSectionSimple',
  components: { Modal, ImageColumn },
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
        this.dyy = event.target.getBoundingClientRect().left - 20
        document.body.style.overflow = 'hidden'
        this.lastwork = event.currentTarget.parentElement
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
    async downloadPreview (event) {
      if (!this.work) {
        const d = JSON.parse(event.currentTarget.nextElementSibling.firstElementChild.firstElementChild.dataset.data)
        try {
          this.work = await this.$prismic.api.getByID(d.id)
          window.open(
            this.work.data.attachment.url,
            '_blank' // <- This is what makes it open in a new window.
          )
        } catch (error) {
          console.error(error)
        }
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
}
</style>
