<template>
  <div class="slider">
    <div class="slider-container">
      <div
        ref="slideshow cv_section"
        class="slideshow"
      >
        <swiper
          ref="swiper"
          :options="swiperOptions"
          controls
        >
          <swiper-slide
            v-for="(image, index) in slice.items"
            :key="index"
            class="slide"
            :style="{
              height: height(),
              width: width(image)
            }"
          >
            <figure>
              <img
                :src="image.image.url"
                :alt="image.image.alt"
              >
              <figcaption class="text-magali inline-block">
                {{ image.image.alt }}
              </figcaption>
            </figure>
          </swiper-slide>
        </swiper>
        <div
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
    <!-- Pagination -->
    <div
      v-if="pagination"
      :class="`${className} text-magali text-xl`"
    />
  </div>
</template>

<script>
const numbers = ['➀', '➁', '➂', '➃', '➄', '➅', '➆', '➇', '➈', '➉', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳', '㉑', '㉒', '㉓', '㉔', '㉕', '㉖', '㉗', '㉘', '㉙', '㉚', '㉛', '㉜', '㉝', '㉞', '㉟', '㊱', '㊲', '㊳', '㊴', '㊵', '㊶', '㊷', '㊸', '㊹', '㊺', '㊻', '㊼', '㊽', '㊾', '㊿']
const activeNumbers = ['➊', '➋', '➌', '➍', '➎', '➏', '➐', '➑', '➒', '➓', '⓫', '⓬', '⓭', '⓮', '⓯', '⓰', '⓱', '⓲', '⓳', '⓴']

export default {
  name: 'Slider',
  props: {
    slice: {
      type: Object,
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
    navigation: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      captionHeight: 40
    }
  },
  computed: {
    cleanUid () {
      return Math.random().toString().replace('.', '')
    },
    className () {
      return `custom-pagination-${this.cleanUid}`
    },
    swiperOptions () {
      return {
        slidesPerView: 'auto',
        spaceBetween: 16,
        autoplay: { delay: 8000 },
        clickable: true,
        numbers,
        speed: 1500,
        activeNumbers,
        navigation: {
          prevEl: `.${this.controlsClass}-previous`,
          nextEl: `.${this.controlsClass}-next`
        },
        pagination: {
          el: `.${this.className}`,
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
    },
    controlsClass () {
      return `custom-controls-${this.cleanUid}`
    }
  },
  methods: {
    bulletClick (e) {
      this.$refs.swiper.swiper.slideTo(e.target.dataset.index)
    },
    height () {
      if (window.innerWidth < 768) {
        return 'auto'
      } else if (window.innerWidth < 1920) {
        return 500
      } else {
        return 700
      }
    },
    width (image) {
      let h
      if (window.innerWidth < 768) {
        return 'auto'
      } else if (window.innerWidth < 1920) {
        h = 500
      } else {
        h = 680
      }
      return `${h * image.image.dimensions.width / image.image.dimensions.height}px`
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
  max-width: 100vw;
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
