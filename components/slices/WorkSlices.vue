<template>
  <div class="slices">
    <WorkSlider
      v-for="(slice, i) in slices"
      :key="i + 'work'"
      :swiper-id="i.toString()"
      :autoplay="i === 0"
      :field="slice"
      class="mb-10"
    />
  </div>
</template>

<script>
import WorkSlider from '@/components/slices/WorkSlider.vue'

export default {
  name: 'Slices',
  components: {
    WorkSlider
  },
  props: {
    slices: {
      type: Array,
      required: true
    }
  }
}
</script>
