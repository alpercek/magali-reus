<template>
  <figure
    :class="{
      'sm:h-full': inSlider
    }"
  >
    <img
      v-lazy="original ? uncompressed(field.primary.image1.url) : uncompressed(field.primary.image1.Huge.url)"
      :class="{
        'sm:h-full': inSlider,
        'home-image': onHome
      }"
      class="image"
      alt=""
    >
    <figcaption
      v-if="captions"
      :class="{
        'px-4 sm:px-0 font-bold text-magali h-full align-middle tight text-sm sm:text-base': onHome
      }"
    >
      {{ field.primary.image1.alt }}
    </figcaption>
  </figure>
</template>

<script>
import utils from '@/mixins/utils'
export default {
  name: 'ImageSlice',
  mixins: [utils],
  props: {
    field: {
      type: Object,
      required: true
    },
    original: {
      type: Boolean,
      required: false,
      default: false
    },
    inSlider: {
      type: Boolean,
      required: false,
      default: false
    },
    onHome: {
      type: Boolean,
      required: false,
      default: false
    },
    captions: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    uncompressed (url) {
      url = url.replace(/\?.*$/, '')
      return url
    }
  }
}
</script>

<style lang="postcss" scoped>
img[lazy=loading] {
  height: 400px;
}

.home-image {
  @apply mb-1;
}

@screen sm {
  .home-image {
    height: var(--slider-image-height);

    & img {
      height: 100%;
    }
  }
}
</style>
