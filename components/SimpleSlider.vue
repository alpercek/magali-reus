<template>
  <div class="outer-container">
  <div class="work">
  <div
    ref="self"
    class="work-slideshow"
  >
    <swiper
      ref="swiper"
      :options="swiperOptions"
    >
      <swiper-slide
        v-for="(slide, index) in slides.filter(slice => slice.slice_type === 'image')"
        :key="index"
        class="slide"
        :style="{
              width: width(slide)
            }"
      >
        <figure>
          <img
            class="w-full object-contain object-top"
            :src="slide.primary.image1.url"
            :alt="slide.primary.image1.alt"
          >
        </figure>
      </swiper-slide>
    </swiper>
    <div
      v-if="swiperOptions.navigation"
      :key="controlsClass"
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
    <div v-if="kedi" ref="customNumbersSlider" class="sm:flex px-4 sm:px-0 mb-1 whitespace-nowrap overflow-x-scroll hide-scrollbars">
      <Number
        v-for="(slide, i) in slides.filter(slice => slice.slice_type === 'image')"
        :key="i"
        :i="i + 1"
        class="inline-block"
        :class="{
          'mr-3': i === slides.filter(slice => slice.slice_type === 'image').length - 1 || slide.last,
        }"
        :active="activeIndex === i"
        @clicked="bulletClick"
      />
    </div>
    <prismic-rich-text
            class="font-bold text-xl sm:text-base text-magali h-full align-middle tight px-4 sm:px-0"
            :field="uid.data.title"
          />
</div>
</template>

<script>
import Number from '@/components/numbers/Number.vue'

export default {
  name: 'SimpleSlider',
  components: {
    Number
  },
  props: {
    slides: {
      type: Array,
      required: true
    },
    uid: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      kedi: true,
      activeIndex: 0
    }
  },
  computed: {
    swiperOptions () {
      const vue = this
      return {
        slidesPerView: window.innerWidth < 768 ? 1 : 'auto',
        spaceBetween: 16,
        autoHeight: true,
        clickable: true,
        speed: 1500,
        navigation: this.slides.length > 1
          ? {
              prevEl: `.${this.controlsClass}-previous`,
              nextEl: `.${this.controlsClass}-next`
            }
          : false,
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
    },
    controlsClass () {
      return `custom-controls-${this.uid.id}`
    }
  },
  methods: {
    width (slide) {
      let h

      if (window.innerWidth < 768) {
        return 'auto'
      } else if (window.innerWidth < 1280) {
        h = 500
        return `${h * slide.primary.image1.dimensions.width / slide.primary.image1.dimensions.height}px`
      } else {
        h = 700
        return `${h * slide.primary.image1.dimensions.width / slide.primary.image1.dimensions.height}px`
      }
    },
    bulletClick (i) {
      this.$refs.swiper.swiper.slideTo(i)
    }
  }
}
</script>

<style lang="postcss" scoped>
.slideshow {
  height: 100%;
  cursor: grab;
  position: relative;
  opacity: 1;
  transition: opacity 0.3s ease;

  &.autoHeight,
  &.autoHeight .swiper-container {
    height: auto;
  }

  &.ready {
    opacity: 1;
  }

  .swiper-container {
    height: 100%;

    figure {
      height: 100%;

      img {
        height: auto;
      }

      figcaption {
        @apply w-full text-right opacity-100 sm:opacity-0 transition-opacity duration-300 text-sm;
        height: var(--slider-caption-height);
      }

      &:hover {
        figcaption {
          @apply opacity-100;
        }
      }
    }
  }

  .slide {
    height: 100%;
  }
}

.slider-description {
  max-width: 400px;
}

.slider {
  @apply w-full h-full md:w-full md:h-auto relative;
  max-width: 600px;
}
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
@screen sm {
.slide:last-child {
  padding-right: 24px;
}
}
.slide:last-child > figure > img {
  object-fit: cover !important;
}
</style>
