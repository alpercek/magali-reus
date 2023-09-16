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
        autoplay: this.autoplay ? { delay: 8000 } : false,
        clickable: true,
        numbers,
        activeNumbers,
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
    }
  },
  methods: {
    bulletClick (e) {
      this.$refs.swiper.swiper.slideTo(e.target.dataset.index)
    },
    height () {
      return 700
    },
    width (image) {
      let h
      if (window.innerWidth < 768) {
        return 'auto'
      } else if (window.innerWidth < 1280) {
        h = 500
      } else {
        h = 700
      }
      return `${h * image.image.dimensions.width / image.image.dimensions.height}px`
    }
  }
}
</script>

<style lang="postcss" scoped>
.slider-container {
  /* min-height: 40vh; */
  @apply mb-4;
}
@screen md {
  .slider-container {
    height: auto;
    @apply mb-0;
  }
}

.slideshow {
  height: var(--slider-height);
  cursor: grab;

  .swiper-container {
    height: 100%;

    figure {
      height: var(--slider-height);
      width: auto;

      img {
        height: var(--slider-image-height);
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
</style>
