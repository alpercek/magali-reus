<template>
  <div
    ref="self"
    class="slider"
  >
    <div
      ref="slideshow cv_section"
      class="slideshow pb-4 md:pb-0"
      :class="{ ready }"
    >
      <swiper
        ref="swiper"
        :options="swiperOptions"
      >
        <swiper-slide
          v-for="(image, index) in slides"
          :key="index"
          class="slide"
        >
          <figure v-if="image.slide" class="slideInner">
            <img class="w-full object-contain object-top" :src="image.slide.url" :alt="image.slide.alt">
            <figcaption class="text-magali inline-block">
              {{ image.slide.alt }}
            </figcaption>
          </figure>
        </swiper-slide>
      </swiper>
      <div
        v-if="swiperOptions.navigation"
        :key="controlsClass"
        :class="`custom-controls-container ${controlsClass}`"
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
    <!-- Pagination -->
    <div
      v-if="pagination"
      :class="`${paginationClass} text-magali text-xl`"
    />
  </div>
</template>

<script>
const numbers = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳', '㉑', '㉒', '㉓', '㉔', '㉕', '㉖', '㉗', '㉘', '㉙', '㉚', '㉛', '㉜', '㉝', '㉞', '㉟', '㊱', '㊲', '㊳', '㊴', '㊵', '㊶', '㊷', '㊸', '㊹', '㊺', '㊻', '㊼', '㊽', '㊾', '㊿']
const activeNumbers = ['⓿', '❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '❿', '⓫', '⓬', '⓭', '⓮', '⓯', '⓰', '⓱', '⓲', '⓳', '⓴']

export default {
  name: 'Slider',
  props: {
    slides: {
      type: Array,
      required: true
    },
    autoplay: {
      type: Boolean,
      required: false
    },
    pagination: {
      type: Boolean,
      required: false
    },
    uid: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      ready: false
    }
  },
  computed: {
    cleanUid () {
      return Math.random().toString().replace('.', '')
    },
    paginationClass () {
      return `custom-pagination-${this.uid}`
    },
    controlsClass () {
      return `custom-controls-${this.uid}`
    },
    swiperOptions () {
      const vue = this
      return {
        slidesPerView: window.innerWidth < 768 ? 1 : 'auto',
        spaceBetween: 0,
        autoplay: this.autoplay ? { delay: 8000 } : false,
        autoHeight: true,
        clickable: true,
        numbers,
        speed: 1500,
        activeNumbers,
        on: {
          init () {
            setTimeout(() => {
              vue.ready = true
              this.update()
            }, 500)
          }
        },
        navigation: this.slides.length > 1
          ? {
              prevEl: `.${this.controlsClass}-previous`,
              nextEl: `.${this.controlsClass}-next`
            }
          : false,
        pagination: {
          el: `.${this.paginationClass}`,
          type: 'custom',
          renderCustom (swiper, current, total) {
            // http://xahlee.info/comp/unicode_circled_numbers.html

            let string = ''
            for (let i = 0; i < total; i++) {
              const symbol = i + 1 === current ? activeNumbers[i] : numbers[i]
              string += '<span data-index="' + i + '" class="symbol cursor-pointer text-xl"><span class="inner" data-index="' + i + '">' + symbol + '</span><span class="alt" data-index="' + i + '">' + activeNumbers[i] + '</span></span>'
            }

            return string
          }
        }
      }
    }
  },
  updated () {
    console.log(this.swiperOptions.navigation)
    this.$refs.swiper.swiper.update()
  },
  methods: {
    bulletClick (e) {
      this.$refs.swiper.swiper.slideTo(e.target.dataset.index)
    },
    height () {
      // return 700
    },
    width (image) {
      let h

      if (window.innerWidth < 768) {
        return 'auto'
      } else if (window.innerWidth < 1280) {
        h = 500
        return `${h * image.dimensions.width / image.dimensions.height}px`
      } else {
        h = 700
        return `${h * image.dimensions.width / image.dimensions.height}px`
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.slideshow {
  height: 100%;
  cursor: grab;
  position: relative;
  opacity: 0;
  transition: opacity 0.3s ease;

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
</style>
