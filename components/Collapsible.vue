<template>
  <div class="collapsible content" :class="{ 'fixed-size': !$route.path.includes('books') }">
    <span v-if="!$route.path.includes('text')" class="header" @click="toggle">
      <slot name="title" />
      <span
        v-if="!emptyContent && !noHeader"
        v-show="!alwaysOpen"
        :class="iconClass"
        class="text-magali "
      >
        {{ open ? '⊖' : '⊕' }}
      </span>
    </span>
    <transition
      name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-show="open || alwaysOpen" class="collapsible">
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Collapsible',
  props: {
    isOpen: {
      type: Boolean,
      required: false
    },
    noHeader: {
      type: Boolean,
      required: false
    },
    // Skip checking if there are empty props!
    noCheck: {
      type: Boolean,
      required: false
    },
    iconClass: {
      type: String,
      required: false,
      default: ''
    },
    alwaysOpen: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      open: false,
      emptyContent: false
    }
  },
  beforeMount () {
    this.open = this.isOpen
  },
  mounted () {
    if (this.noCheck) {
      this.emptyContent = false
    } else {
      this.emptyContent = this.$slots.content ? this.$slots?.content[0]?.data?.domProps?.innerHTML === '' : true
    }
  },
  methods: {
    beforeEnter (el) {
      el.style.height = '0'
    },
    enter (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave (el) {
      el.style.height = '0'
    },
    toggle () {
      this.open = !this.open
    }
  }
}
</script>

<style lang="postcss">
.collapsible {
  transition: 150ms ease-out;
  overflow: hidden;

  .header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    @apply mb-2 select-none;
  }
}

@screen md {
  .collapsible.content.fixed-size {
    width: 800px;
  }
}
</style>
