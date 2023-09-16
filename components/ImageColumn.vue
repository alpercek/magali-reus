<template>
  <div class="w-full">
    <img
      v-for="image, index in images"
      :key="image.primary.image1.url"
      class="w-full"
      :class="{ 'mb-8': index < images.length - 1 }"
      :src="image.primary.image1.url"
      :alt="image.primary.image1.alt"
    >
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
