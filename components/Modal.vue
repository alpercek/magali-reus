<template>
  <div class="fixed inset-0 bg-white bg-opacity-50 z-50 flex flex-col justify-start items-center py-20 sm:py-8 overflow-y-scroll">
    <div class="hidden sm:block max-w-screen-sm">
      <slot />
    </div>
    <div class="sm:hidden w-full" @click="onClick">
      <slot />
    </div>
    <div class="hidden sm:block fixed top-0 right-0 mx-8 mt-8 cursor-pointer select-none" @click="onClick">
      ✕
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    active: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onClick () {
      this.$emit('close')
    }
  }
}
</script>
