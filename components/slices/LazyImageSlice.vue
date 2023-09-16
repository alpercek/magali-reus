<template>
  <img
    v-lazy="original ? uncompressed(field.primary.image1.url) : uncompressed(field.primary.image1.Huge.url)"
    class="image"
    alt=""
  >
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
    }
  }
}
</script>

<style lang="postcss">
@keyframes loading {
  0%,
  66% {
    background: #ffffff;
  }
  100% {
    background: #dddddd;
  }
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

img[lazy=loading] {
  transition: opacity 0.2s ease;
  opacity: 1;
  animation: loading 1s ease infinite alternate;
}

img[lazy=loaded] {
  opacity: 1;
  animation: fadein 1s ease;
}
</style>
