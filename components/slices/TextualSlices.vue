<template>
  <div class="w-full">
    <component
      :is="mappings[slice.slice_type]"
      v-for="(slice, i) in body"
      :id="slice.id"
      :key="i"
      v-bind="{
        slice,
        isOpen: w > 640 || slice.slice_type === 'texts_with_file' || slice.slice_type === 'cv_section__publications_',
        controls: true
      }"
      @hovering="handleHovering"
    />
  </div>
</template>

<script>
import TextSlice from '@/components/slices/TextSlice'
import TextsWithFileSlice from '@/components/slices/TextsWithFileSlice'
import CVSectionPress from '@/components/slices/CVSectionPress'
import CVSectionPublications from '@/components/slices/CVSectionPublications'
import CVSectionSimple from '@/components/slices/CVSectionSimple'
import CVSectionTwoColumns from '@/components/slices/CVSectionTwoColumns'
import CVSectionTwoColumnsImage from '@/components/slices/CVSectionTwoColumnsImage'
import SliderSlice from '@/components/slices/SliderSlice'
import Exhibitions from '@/components/slices/Exhibitions'

export default {
  name: 'TextualSlices',
  components: {
    CVSectionPress,
    CVSectionPublications,
    CVSectionSimple,
    CVSectionTwoColumns,
    CVSectionTwoColumnsImage,
    SliderSlice,
    Exhibitions
  },
  props: {
    body: {
      type: Array,
      required: true
    },
    rightColumn: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      w: window.innerWidth,
      mappings: {
        press: CVSectionPress,
        exhibitions: Exhibitions,
        cv_section__publications_: CVSectionPublications,
        cv_section__simple_: CVSectionSimple,
        cv_section__two_columns_: CVSectionTwoColumns,
        cv_section__two_columns_image: CVSectionTwoColumnsImage,
        paragraph: TextSlice,
        texts_with_file: TextsWithFileSlice,
        slider: SliderSlice
      }
    }
  },
  methods: {
    handleHovering (id) {
      this.$emit('hovering', id)
    },
    getMyPublication (id) {
      return this.publications.find(p => p.id === id)
    }
  }
}
</script>
