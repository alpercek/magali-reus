<template>
  <div
    ref="self"
    class="slider"
  >
    <swiper
      ref="swiper"
      :options="swiperOptions"
    >
      <swiper-slide
        v-for="(slide, index) in slides.filter(slice => slice.slice_type === 'image')"
        :key="index"
        class="slide"
      >
        <figure>
          <img
            class="w-full object-contain object-top"
            :src="slide.primary.image1.url"
            :alt="slide.primary.image1.alt"
          >
          <figcaption class="text-magali inline-block">
            {{ slide.primary.image1.alt }}
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
</template>

<script>

export default {
  name: 'SimpleSlider',
  props: {
    slides: {
      type: Array,
      required: true
    },
    uid: {
      type: String,
      required: true
    }
  },
  computed: {
    swiperOptions () {
      return {
        slidesPerView: window.innerWidth < 768 ? 1 : 'auto',
        spaceBetween: 0,
        autoHeight: true,
        clickable: true,
        speed: 1500,
        navigation: this.slides.length > 1
          ? {
              prevEl: `.${this.controlsClass}-previous`,
              nextEl: `.${this.controlsClass}-next`
            }
          : false
      }
    },
    controlsClass () {
      return `custom-controls-${this.uid}`
    }
  },
  methods: {
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
</style>
