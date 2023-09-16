<template>
  <div :style="{ 'flex-basis': width + 'px' }" class="toggle-children svg-button relative w-auto h-4 cursor-pointer" :class="{ active }">
    <img :style="{ width: width + 'px !important' }" class="w-full h-full toggle-children-primary absolute top-0 left-0" :src="`/${src}.svg`">
    <img :style="{ width: width + 'px !important' }" class="w-full h-full toggle-children-secondary absolute top-0 left-0" :src="`/${src} inv.svg`">
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="postcss">
.svg-button {
  margin-right: 2px;
}
</style>
