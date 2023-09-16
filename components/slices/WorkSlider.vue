<template>
  <div v-if="!$fetchState.pending" :id="cleanUid" v-intersect="{ onChange: handleIntersection }" class="work-outer">
    <div
      v-if="workSliderVisible"
      class="work"
    >
      <div
        ref="slideshow"
        class="work-slideshow"
      >
        <swiper
          :ref="swiperId"
          :options="swiperOptions"
          controls
        >
          <swiper-slide
            v-for="(slice, index) in document.data.body"
            :key="index"
            class="slide"
            :style="{ width: width(slice) }"
          >
            <nuxt-link v-if="!!getSeriesForWork(index).link && !!getSeriesForWork(index).link.id && !$route.pathname.includes('series')" :to="linkResolver(getSeriesForWork(index).link)">
              <ImageSlice
                in-slider
                :field="slice"
              />
            </nuxt-link>
            <nuxt-link v-else-if="!!field.primary.link_to_page" :to="linkResolver(field.primary.link_to_page)">
              <ImageSlice
                in-slider
                :field="slice"
              />
            </nuxt-link>
            <ImageSlice
              v-else
              in-slider
              :field="slice"
            />
          </swiper-slide>
        </swiper>
        <div
          v-if="controls"
          :class="`custom-controls-container show-on-hover ${controlsClass}`"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15.751" height="28.675" viewBox="0 0 15.751 28.675" :class="`${controlsClass}-previous previous w-12 h-12`">
            <path
              id="Path_5"
              data-name="Path 5"
              d="M8155.935,449.88l-13.63-13.63,13.63-13.63"
              transform="translate(-8140.89 -421.911)"
              fill="none"
              stroke="var(--color-magali)"
              stroke-width="2"
            />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="15.751" height="28.675" viewBox="0 0 15.751 28.675" :class="`${controlsClass}-next next w-12 h-12`">
            <path
              id="Path_6"
              data-name="Path 6"
              d="M8155.935,449.88l-13.63-13.63,13.63-13.63"
              transform="translate(8156.642 450.587) rotate(180)"
              fill="none"
              stroke="var(--color-magali)"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="workSliderVisible" class="flex px-4 sm:px-0 mb-1">
      <Number
        v-for="(slide, i) in document.data.body"
        :key="i"
        :i="i + 1"
        :class="{ 'mr-2': i === document.data.body.length - 1 }"
        :active="activeIndex === i"
        @clicked="bulletClick"
      />
    </div>
    <prismic-rich-text
      v-if="workSliderVisible && $route.path === '/'"
      class="px-4 sm:px-0 font-bold text-magali h-full align-middle tight text-lg sm:text-base"
      :field="document.data.title"
    />
    <Collapsible v-else-if="!field.primary.link_to_page && workSliderVisible" class="work-description text-magali px-4 md:px-0" icon-class="icon text-magali text-[12pt]">
      <prismic-rich-text
        slot="title"
        class="font-bold text-[12pt] text-magali h-full align-middle tight"
        :field="document.data.title"
      />
      <prismic-rich-text
        slot="content"
        class="text-[12pt] text-black tight"
        :field="document.data.description"
      />
    </Collapsible>
    <nuxt-link
      v-else-if="workSliderVisible"
      class="text-lg sm:text-base text-magali underline sm:hidden"
      :to="linkResolver(field.primary.link_to_page)"
    >
      Show series
    </nuxt-link>
  </div>
</template>

<script>
import ImageSlice from '@/components/slices/ImageSlice.vue'
import Collapsible from '@/components/Collapsible.vue'
import Number from '@/components/numbers/Number.vue'
import linkResolver from '~/app/prismic/link-resolver'

export default {
  name: 'WorkSlider',
  components: {
    ImageSlice,
    Collapsible,
    Number
  },
  props: {
    hasDocument: {
      type: Boolean,
      required: false,
      default: false
    },
    field: {
      type: Object,
      required: true
    },
    autoplay: {
      type: Boolean,
      required: false
    },
    controls: {
      type: Boolean,
      required: false,
      default: true
    },
    swiperId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      document: null,
      workSliderVisible: false,
      activeIndex: 0,
      linkResolver
    }
  },
  async fetch () {
    if (this.hasDocument) {
      this.document = this.field
    } else {
      this.document = await this.$prismic.api.getByUID('work', this.field.primary.work.uid)
    }
  },
  computed: {
    cleanUid () {
      if (this.document) {
        return this.document.uid.replaceAll('.', '')
      } else {
        return null
      }
    },
    controlsClass () {
      return `custom-controls-${this.cleanUid}`
    },
    className () {
      return `custom-pagination-${this.cleanUid}`
    },
    swiperOptions () {
      const vue = this
      return {
        slidesPerView: 1,
        spaceBetween: 16,
        autoplay: this.autoplay ? { delay: 8000 } : false,
        clickable: true,
        breakpointsInverse: true, // mobile first
        autoHeight: true,
        speed: 1500,
        breakpoints: {
          640: {
            preventClicks: true,
            preventClicksPropagation: true,
            allowTouchMove: false,
            slidesPerView: 'auto',
            autoHeight: false
          }
        },
        navigation: {
          prevEl: `.${this.controlsClass}-previous`,
          nextEl: `.${this.controlsClass}-next`
        },
        on: {
          slideChangeTransitionEnd () {
            vue.activeIndex = this.activeIndex
          }
        }
      }
    }
  },
  methods: {
    getSeriesForWork (index) {
      return this.document.data.body[index]
    },
    handleIntersection (intersecting, entry) {
      if (intersecting) {
        this.workSliderVisible = true
      }
    },
    bulletClick (i) {
      this.$refs[this.swiperId].swiper.slideTo(i)
    },
    width (slice) {
      let h
      h = this.$el.parentElement.clientHeight

      if (window.innerWidth > 768 && window.innerWidth < 1280) {
        h = 500
      } else {
        h = 700
      }
      return `${h * slice.primary.image1.dimensions.width / slice.primary.image1.dimensions.height}px`
    }
  }
}
</script>

<style lang="postcss" scoped>
.work-outer {
  min-height: var(--slider-image-height);
}

.work {
  min-height: var(--slider-image-height);
  @apply mb-2;
}

.work-slideshow {
  position: relative;
}

@screen md {
  .work-slideshow {
    height: var(--slider-image-height);
    width: 100%;
    position: relative;

    .swiper-container {
      height: 100%;

      & > figure {
        height: 100%;
        /* width: auto !important; */

        & > img {
          height: 100%;
        }
      }
    }

    .slide {
      height: 100%;
    }
  }
}

.work-description {
  max-width: 600px;
}

.bullet {
  font-size: 12pt;
}

</style>
