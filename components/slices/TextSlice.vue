<template>
  <section
    class="cv_section"
  >
    <prismic-rich-text
      class="paragraph text-[14px] tight"
      :field="slice.primary.text"
    />
  </section>
</template>

<script>
export default {
  name: 'TextSlice',
  props: {
    slice: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.textSlice {
  max-width: 50ch;
}
</style>
