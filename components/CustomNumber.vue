<template>
  <div :id="`cn-${i}`" :key="i" class="toggle-children custom-number relative block w-5 h-5 sm:w-4 sm:h-4 cursor-pointer" :class="{ active }" @click="$emit('clicked', i - 1)">
    <img class="w-full h-full toggle-children-primary absolute top-0 left-0" :src="`/numbers/${i}.svg`">
    <img class="w-full h-ful toggle-children-secondary absolute top-0 left-0" :src="`/numbers/${i} inv.svg`">
  </div>
</template>

<script>
export default {
  props: {
    i: {
      type: Number,
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
.custom-number {
  margin-right: 2px;
}
</style>
