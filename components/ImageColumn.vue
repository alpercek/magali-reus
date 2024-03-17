<template>
  <div class="max-h-screen object-scale-down">
    <div v-for="image, index in images" :key="image.primary.image1.url" :class=" index < images.length - 1 ? 'mb-8' : 'pb-12' ">
      <img
      v-lazy="uncompressed(image.primary.image1.url)"
        class="max-h-screen m-auto image"
        :alt="image.primary.image1.alt"
      >
      <prismic-rich-text
        :field="image.primary.text1"
        class="text-xs text-center mt-1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageColumn',
  props: {
    images: { // slices
      type: Array,
      required: true
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
