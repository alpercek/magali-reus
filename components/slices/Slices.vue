<template>
  <div class="slices">
    <component
      :is="mappings[slice.slice_type]"
      v-for="(slice, i) in slices"
      v-bind="{
        field: slice,
        captions: true,
        controls: true
      }"
      :key="i + 'a'"
      class="mb-8 slice"
    />
  </div>
</template>

<script>
import SpacerSlice from '@/components/slices/SpacerSlice.vue'
import ImageSlice from '@/components/slices/ImageSlice.vue'
import VideoSlice from '@/components/slices/VideoSlice.vue'
import TextSlice from '@/components/slices/TextSlice.vue'

export default {
  name: 'Slices',
  components: {
    SpacerSlice,
    ImageSlice,
    VideoSlice,
    TextSlice
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
        spacer: 'SpacerSlice',
        image: 'ImageSlice',
        video: 'VideoSlice',
        paragraph: 'TextSlice'
      }
    }
  }
}
</script>
