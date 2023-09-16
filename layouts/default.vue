<template>
  <div
    v-if="!$fetchState.pending"
    class="main"
  >
    <ThemeColor />
    <div
      v-if="$nuxt.isOffline"
      class="fixed inset-0 flex justify-center items-center text-magali"
    >
      <p class="text-center">
        Magali Reus is offline
        <br>
        Or are you?
      </p>
    </div>
    <template v-if="!$nuxt.isOffline">
      <nuxt-link
        class="font-normal hidden sm:block sticky z-20 top-0 left-0 px-4 pt-8 pb-32"
        :class="{ fixed: !main.collapsed, absolute: main.collapsed }"
        to="/"
      >
        <!-- MAGALI REUS -->
        <Magali />
      </nuxt-link>

      <div class="collapse-toggle hidden sm:block">
        <span
          class="text-3xl text-magali select-none"
          @click="setCollapsed(!main.collapsed)"
        >
          {{ !main.collapsed ? '-' : '+' }}
        </span>
      </div>

      <Navigation
        class="hidden sm:block"
        :series="series"
        :pages="pages"
      />

      <MobileNavigation
        class="sm:hidden"
        :series="series"
        :pages="pages"
      />

      <div
        class="mt-24 sm:mt-0 sm:block transition-all duration-400"
        :style="computedMargin"
      >
        <nuxt />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import config from '@/plugins/head'
import Navigation from '@/components/Navigation.vue'
import ThemeColor from '@/components/ThemeColor.vue'
import Magali from '@/components/Magali.vue'

export default {
  name: 'Default',
  components: {
    Navigation,
    ThemeColor,
    Magali
  },
  data () {
    return {
      home: null,
      root: null,
      vw: 0,
      series: [],
      pages: [],
      entered: false
    }
  },
  async fetch () {
    const home = await this.$prismic.api.getSingle('home')
    this.home = home

    const sids = this.home.data.series.map(series => series.page.id)
    const ids = this.home.data.menu.map(page => page.page.id)

    const sresult = await this.$prismic.api.getByIDs(sids, { pageSize: 99 })
    const result = await this.$prismic.api.getByIDs(ids)

    this.series = this.home.data.series.map(page => sresult.results.find(p => p.id === page.page.id)).filter(s => !!s)
    this.pages = this.home.data.menu.map(page => result.results.find(p => p.id === page.page.id)).filter(s => !!s)
  },
  head () {
    if (this.$colorMode.preference === 'system') {
      return config(this.$colorMode.value)
    } else {
      return config(this.$colorMode.fallback)
    }
  },
  computed: {
    ...mapState(['main']),
    computedMargin () {
      if (this.vw > 640) {
        return {
          marginLeft: !this.main.collapsed ? '260px' : '56px'
        }
      }

      return {}
    }
  },
  watch: {
    $route (to) {
      this.setPreviewing(false)

      if (to.hash) {
        const el = document.querySelector(to.hash.replace('.', ''))
        this.$scrollTo(el, { offset: -50 })
      }
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)

    if (this.$route.hash) {
      setTimeout(() => {
        const el = document.querySelector(this.$route.hash.replace('.', ''))
        if (el) {
          this.$scrollTo(el, { offset: -50 })
        }
      }, 1000)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      this.vw = window.innerWidth
    },
    ...mapActions({
      setCollapsed: 'main/SET_COLLAPSED',
      setPreviewing: 'main/SET_PREVIEWING'
    })
  }
}
</script>

<style lang="postcss">
* {
  @apply font-serif;
}

.fly-enter-active,
.fly-leave-active {
  transition: transform 0.5s ease;
}

.fly-enter-from,
.fly-leave-to {
  transform: translateY(-100%);
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active,
.fade-delay-enter-active,
.fade-delay-leave-active,
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}

.fade-delay-enter-active {
  transition-delay: 1s;
}
.fade-delay-enter,
.fade-delay-leave-active,
.fade-enter,
.fade-leave-active,
.page-enter,
.page-leave-active {
  opacity: 0;
}

.no-padding {
  padding: 0 !important;
}

.collapse-toggle {
  position: fixed;
  top: 0;
  margin-top: 152px;
  /* top: calc(theme('spacing.24') - 4px); */
  left: 0;
  z-index: 10;
  transform-origin: top left;
  padding: 0 !important;
  cursor: pointer;
  @apply mb-4 ml-4;
}
</style>
