<template>
  <div class="slices">
    <component
      :is="mappings[slice.slice_type]"
      v-for="(slice, i) in slices"
      v-bind="{
        field: slice,
        captions: true,
        onHome: $route.path === '/',
        autoplay: i === 0,
        isOpen: true,
        swiperId: 'swiper-' + i,
        controls: true
      }"
      :key="i + 'a'"
      class="mb-10 slice"
    />
  </div>
</template>

<script>
import HomeWorkSlider from '@/components/slices/HomeWorkSlider.vue'
import WorkSlider from '@/components/slices/WorkSlider.vue'
import ImageSlice from '@/components/slices/ImageSlice.vue'

export default {
  name: 'Slices',
  components: {
    HomeWorkSlider,
    WorkSlider,
    ImageSlice
  },
  props: {
    slices: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      mappings: {
        work: 'WorkSlider',
        home_slider: 'HomeWorkSlider',
        image: 'ImageSlice'
      }
    }
  },
  mounted () {
    console.log('home slices')
  }
}
</script>
