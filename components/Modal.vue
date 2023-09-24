<template>
  <div style="z-index: 52;" class="fixed inset-0 bg-white bg-opacity-75 flex flex-col justify-start items-center sm:pb-8 overflow-y-scroll hide-scrollbars" @click="onClick">
    <div class="hidden sm:block h-screen object-scale-down">
      <slot />
    </div>
    <div class="sm:hidden" @click="onClick">
      <slot />
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
  mounted () {
  },
  methods: {
    onClick () {
      this.$emit('close')
    }
  }
}
</script>
