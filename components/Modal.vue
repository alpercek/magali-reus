<template>
  <div>
  <div style="z-index: 56;" :style="style" class="fixed inset-0 flex flex-col justify-start items-center sm:pb-8 overflow-y-scroll hide-scrollbars" @click="onClick($event)" @scroll="onScroll($event)">
    <div class="hidden sm:block h-screen object-scale-down">
      <slot />
    </div>
    <div class="sm:hidden" @click="onClick($event)">
      <slot />
    </div>
  </div>
  <div style="z-index: 52;" class="fixed inset-0 bg-white bg-opacity-90"></div>
</div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    dx: {
      type: Number,
      required: true
    }
  },
  computed: {
    style () {
      return {
        paddingTop: `${this.dx}px`
      }
    }
  },
  mounted () {
  },
  methods: {
    onClick (event) {
      if (event.y > 100) {
        this.$emit('close')
      }
    },
    onScroll (event) {
      if (event.target.scrollTop >= this.dx - 30) {
        this.$emit('freeze')
      } else {
        this.$emit('melt')
      }
    }
  }
}
</script>
