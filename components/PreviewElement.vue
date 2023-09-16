<template>
  <div class="previewElement">
    <Slider
      v-if="main.previewing"
      :key="main.previewing.id"
      :slides="main.previewing.data.slides"
      :uid="main.previewing.id || 'a'"
      autoplay
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Slider from '@/components/Slider.vue'

export default {
  name: 'PreviewElement',
  components: { Slider },
  computed: mapState(['main'])
}
</script>

<style lang="postcss">
.previewElement {
  /* @apply aspect-w-4 aspect-h-3; */
}
</style>
