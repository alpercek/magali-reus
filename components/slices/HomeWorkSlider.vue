<template>
  <div v-if="!$fetchState.pending" v-intersect="{ onChange: handleIntersection }" class="outer-container">
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
            v-for="(slice, index) in allShuffledWorks"
            :key="index"
            class="slide"
            :class="{ last: slice.last }"
            :style="{
              width: width(slice)
            }"
          >
            <nuxt-link v-if="!!getSeriesForWork(index).link.id" :to="linkResolver(getSeriesForWork(index).link)">
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
    <div v-if="workSliderVisible" ref="customNumbersSlider" class="sm:flex px-4 sm:px-0 mb-1 whitespace-nowrap overflow-x-scroll hide-scrollbars">
      <Number
        v-for="(slide, i) in allShuffledWorks"
        :key="i"
        :i="i + 1"
        class="inline-block"
        :class="{
          'mr-3': i === allShuffledWorks.length - 1 || slide.last,
        }"
        :active="activeIndex === i"
        @clicked="bulletClick"
      />
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="workSliderVisible && activeWork" :key="activeWork.info.uid" class="px-4 sm:px-0">
        <prismic-rich-text
          class="font-bold text-xl sm:text-base text-magali h-full align-middle tight"
          :field="activeWork.info.data.title"
        />
        <nuxt-link class="text-lg sm:text-base text-magali underline sm:hidden" :to="linkResolver(activeWork.link)">
          Show series
        </nuxt-link>
      </div>
    </transition>
  </div>
</template>

<script>
import linkResolver from '~/app/prismic/link-resolver'

import ImageSlice from '@/components/slices/ImageSlice.vue'
// import Collapsible from '@/components/Collapsible.vue'
import Number from '@/components/numbers/Number.vue'

export default {
  name: 'HomeWorkSlider',
  components: {
    ImageSlice,
    // Collapsible,
    Number
  },
  props: {
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
      workDocuments: null,
      workSliderVisible: false,
      allShuffledWorks: [],
      amountOfPics: 3,
      activeIndex: 0,
      linkResolver
    }
  },
  async fetch () {
    const ids = this.field.items.map(w => w.work.id)

    const page = await this.$prismic.api.getByIDs(ids)
    this.workDocuments = page.results

    // Insert 3 of each
    let allSlices = [...this.workDocuments.map((w) => {
      let section = w.data.body.filter((i) => {
        if (i.primary.show_in_selection !== null) {
          return i.primary.show_in_selection
        } else {
          return i
        }
      })
      // Add a marker for the last of the series
      section[section.length - 1].last = true

      const item = this.field.items.find(i => i.work.uid === w.uid)

      // Add the work information as well for details
      section = section.map((i) => {
        i.info = w
        i.link = item.link_to_page
        return i
      })
      return section
    })
    ]
    allSlices = this.shuffle(allSlices).slice(0, this.field.primary.amount_of_works)
    this.allShuffledWorks = allSlices.flat()
  },
  computed: {
    activeWork () {
      return this.allShuffledWorks[this.activeIndex]
    },
    controlsClass () {
      return 'custom-controls-home-' + this.swiperId
    },
    className () {
      return 'custom-pagination-home'
    },
    swiperOptions () {
      const vue = this
      return {
        slidesPerView: 1,
        spaceBetween: 16,
        autoplay: this.autoplay ? { delay: 4000 } : false,
        clickable: true,
        breakpointsInverse: true,
        autoHeight: true,
        speed: 1500,
        breakpoints: {
          640: {
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

            const el = vue.$refs.customNumbersSlider.querySelector(`#cn-${this.activeIndex + 1}`)

            if (el) {
              vue.$refs.customNumbersSlider.scrollTo({ left: el.offsetLeft - window.innerWidth / 2 - 10, behavior: 'smooth' })
            }
          }
        }
      }
    }
  },
  mounted () {
    console.log(this.controls)
  },
  methods: {
    getSeriesForWork (index) {
      return this.allShuffledWorks[index]
    },
    shuffle (array) {
      let m = array.length
      let t
      let i

      // While there remain elements to shuffle…
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--)

        // And swap it with the current element.
        t = array[m]
        array[m] = array[i]
        array[i] = t
      }

      return array
    },
    handleIntersection (intersecting, entry) {
      if (intersecting) {
        this.workSliderVisible = true
      }
    },
    bulletClick (i) {
      console.log(this.$refs)
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
      return `${h * (slice.primary.image1.dimensions.width / slice.primary.image1.dimensions.height)}px`
    }
  }
}
</script>

<style lang="postcss" scoped>
.work {
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
        width: auto !important;

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

@screen sm {
  .slide.last  {
    padding-right: 40px;
  }
}

.work-description {
  max-width: 400px;
}

.bullet {
  font-size: 12pt;
}

</style>
