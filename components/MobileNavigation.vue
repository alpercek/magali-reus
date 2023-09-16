<template>
  <div>
    <div class="fixed top-0 w-screen flex justify-between px-4 pt-4" style="z-index: 51">
      <a href="/" class="text-2xl">
        <Magali :open="menuOpen" />
      </a>
      <div
        :class="{
          'is-active': menuOpen,
          'hamburger-magali': menuOpen
        }"
        tabindex="0"
        aria-label="menu"
        class="sm:hidden right-0 z-20 hamburger hamburger--minus navigation-toggle"
        type="button"
        @click="toggleMenu"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner" />
        </span>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="menuOpen"
        class="fixed top-0 inset-0 h-screen overflow-y-scroll px-4 py-2 w-full z-50 sm:hidden bg-white bg-opacity-90 pt-20"
      >
        <ul>
          <li class="text-center text-magali transition-colors hover:text-black mb-4" @click="toggleMenu">
            <nuxt-link
              class="text-3xl leading-tight uppercase inline-block text-magali"
              :class="{ 'text-black': $route.name === 'index' }"
              to="/"
            >
              Main
            </nuxt-link>
          </li>
          <li class="text-center text-magali transition-colors hover:text-black mb-4" :class="{ 'nuxt-link-exact-active': $route.path.includes('series') }">
            <button
              class="text-3xl leading-tight uppercase inline-block"
              @click="toggleSeries"
            >
              Series
            </button>
          </li>
          <transition
            name="accordion"
            @before-enter="beforeEnter"
            @enter="enter"
            @before-leave="beforeLeave"
            @leave="leave"
          >
            <div v-show="seriesOpen" class="collapsible text-center w-full" @click="toggleMenu">
              <nuxt-link
                class="text-3xl leading-tight text-magali uppercase block mb-6"
                :class="{ 'text-black': $route.path === '/series' }"
                to="/series"
              >
                Index
              </nuxt-link>
              <nuxt-link
                v-for="serie in series"
                :key="serie.uid"
                class="text-xl leading-tight text-magali uppercase block mb-4"
                :class="{ 'text-black': $route.path.includes(serie.uid) }"
                :to="linkResolver(serie)"
              >
                <prismic-rich-text :class="{ 'text-black': $route.path.includes(serie.uid) }" :field="serie.data.title" />
              </nuxt-link>
              <a class="text-3xl leading-tight uppercase block mb-4 cursor-pointer text-magali" @click.prevent="toggleSeries">
                –
              </a>
            </div>
          </transition>
          <li
            v-for="page in pages"
            :key="page.uid"
            class="text-center text-magali transition-colors hover:text-black mb-4"
            :class="{ 'text-black': activeRoute(page) }"
            @click="toggleMenu"
          >
            <nuxt-link
              class="text-3xl leading-tight uppercase inline-block"
              :to="linkResolver(page)"
            >
              <prismic-rich-text :field="page.data.title" />
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import linkResolver from '~/app/prismic/link-resolver'
import Magali from '~/components/Magali.vue'

export default {
  name: 'Navigation',
  components: { Magali },
  props: {
    pages: {
      type: Array,
      required: true
    },
    series: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      menuOpen: false,
      seriesOpen: false,
      home: null,
      links: null,
      linkResolver
    }
  },
  methods: {
    activeRoute (doc) {
      return this.$route.path === linkResolver(doc)
    },
    toggleMenu () {
      this.menuOpen = !this.menuOpen
      this.seriesOpen = false
      // if (this.menuOpen && this.$route.name === 'series-uid') {
      //   this.seriesOpen = true
      // } else {
      // }
    },
    toggleSeries () {
      this.seriesOpen = !this.seriesOpen
    },
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
    }
  }
}
</script>

<style lang="postcss" scoped>
.navigation-toggle {
  transform-origin: top right;
  transform: scale(0.6);
}

.nuxt-link-exact-active {
  color: black !important;
}
</style>
