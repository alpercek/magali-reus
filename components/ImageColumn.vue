<template>
  <div class="max-h-screen object-scale-down">
    <div v-for="image, index in images" :key="image.primary.image1.url" :class="{ 'mb-8': index < images.length - 1 }">
      <img
        class="max-h-screen m-auto"
        :src="image.primary.image1.url"
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
  }
}
</script>
