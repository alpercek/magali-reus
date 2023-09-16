<template>
  <div class="spacer" :class="`h-0 lg:height-${field.primary.height} md:height-${field.primary.height_tablet} xl:height-${field.primary.height_xl}`" />
</template>

<script>
export default {
  name: 'SpacerSlice',
  props: {
    field: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.spacer {
  @apply hidden;

  @screen md {
    @apply block;
  }
}
</style>
