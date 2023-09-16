<template>
  <div
    class="splash flex flex-col justify-center select-none bg-white"
    :style="{
      height: `${windowHeight}px`,
      backgroundImage: window.width < 768 ? `url(${doc.data.splash_image_portrait.url})` : `url(${doc.data.splash_image.url})`,
      color: doc.data.splash_text_color
    }"
    @touchstart="leaveByTouch"
    @click="leave"
  >
    <div class="absolute text-white top-0 px-4 pt-12 select-none text-2xl md:text-base hidden md:block">
      <Magali />
    </div>
    <prismic-rich-text class="text-xl md:text-3xl px-12 md:px-20 text-center max-w-2xl mx-auto w-full select-none" :field="doc.data.splash_text" :style="{ color: doc.data.splash_text_color }" />
  </div>
</template>

<script>
import utils from '@/mixins/utils'
import Magali from '@/components/Magali.vue'

export default {
  name: 'Splash',
  components: { Magali },
  mixins: [utils],
  props: {
    doc: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      windowHeight: 0
    }
  },
  mounted () {
    this.setHeight()
    document.body.classList.add('overflow-hidden')
    window.addEventListener('wheel', this.leave)
    window.addEventListener('resize', this.setHeight)
    window.addEventListener('keypress', this.leave)
  },
  beforeDestroy () {
    window.removeEventListener('wheel', this.leave)
    window.removeEventListener('resize', this.setHeight)
    window.removeEventListener('keypress', this.leave)
    setTimeout(() => document.body.classList.remove('overflow-hidden'), 300)
  },
  methods: {
    leaveByTouch () {
      console.log('by touch')
      this.$emit('enter')
      setTimeout(() => document.body.classList.remove('overflow-hidden'), 300)
    },
    leave () {
      console.log('by other event')
      this.$emit('enter')
      setTimeout(() => document.body.classList.remove('overflow-hidden'), 300)
    },
    setHeight () {
      this.windowHeight = window.innerHeight
    }
  }
}
</script>

<style lang="postcss" scoped>
.splash {
  @apply fixed inset-0 z-40;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  p {
    margin-bottom: theme('fontSize.5xl');
    max-width: 70ch;
    text-shadow: 0px 2px 10px rgba(0,0,0,0.2);
    @apply mx-auto;
  }
}
</style>
