<template>
  <nav
    class=" h-screen m-0 pt-48 pb-12 bg-transparent"
    :class="{ collapsed: main.collapsed }"
  ><div class="mb-4 grid">
    <div class="order-first">
      <nuxt-link
        class="page-link uppercase block"
        to="/series"
      >
        Series
      </nuxt-link>
    </div>

    <div style="order: -3;">
      <nuxt-link
        class="page-link uppercase block"
        to="/exhibitions"
      >
        Exhibitions
      </nuxt-link>
    </div>
          <nuxt-link
        v-for="(page, i) in pages"
        :key="page.uid + '-page-' + i"
        class="page-link uppercase block"
        :style="{'order':-i*2}"
        :to="linkResolver(page)"
      >
        <prismic-rich-text :field="page.data.title" />
      </nuxt-link>
    </div>
    <!-- Sub menu -->
    <transition name="fade-delay">
      <div @mouseenter="hovering = true" @mouseleave="hovering = false" v-if="$route.name === 'series'" class="pb-44 overflow-scroll h-full hide-scrollbars block">
        <nuxt-link
          v-for="(serie, i) in series"
          :key="serie.uid + '-series-' + i"
          class="page-link w-full block"
          :to="linkResolver(serie)"
        >
          <prismic-rich-text :field="serie.data.title" />
        </nuxt-link>
        <div key="etf" onclick="if(getComputedStyle(this.firstElementChild).transform == 'matrix(0, 1, -1, 0, 0, 0)') {this.previousElementSibling.scrollIntoView({ behavior: 'smooth', block: 'end' }); this.parentElement.scrollBy({top: 1000, behavior: 'smooth'}); this.firstElementChild.style.transform = 'rotate(-90deg)';} else {this.parentElement.scrollTo({top: 0, behavior: 'smooth'}); this.firstElementChild.style.transform = 'rotate(90deg)';}" class="h-16 w-56 mx-4 hidden md:block fixed bottom-0 left-0 bg-white"><div v-show="hovering" class="animate-pulse cursor-pointer arroww asdf">»</div></div>
      </div>
    </transition>

    <!-- Sub menu -->
    <transition name="fade" mode="out-in">
      <div v-if="main.sub.length > 1" @mouseenter="xhex($event)" @mouseleave="hoveringg = false" :key="main.sub.length" class="pb-44 overflow-scroll h-full hide-scrollbars block">
        <nuxt-link
          v-for="(item, i) in main.sub"
          :key="item.id + '-' + i"
          :to="`#${item.id}`"
          :class="{ 'text-magali': $route.hash.includes(item.id) }"
          class="block"
        >
          {{ item.title }}
        </nuxt-link>
        <div onclick="if(getComputedStyle(this.firstElementChild).transform == 'matrix(0, 1, -1, 0, 0, 0)') {this.previousElementSibling.scrollIntoView({ behavior: 'smooth', block: 'end' }); this.parentElement.scrollBy({top: 1000, behavior: 'smooth'}); this.firstElementChild.style.transform = 'rotate(-90deg)';} else {this.parentElement.scrollTo({top: 0, behavior: 'smooth'}); this.firstElementChild.style.transform = 'rotate(90deg)';}" class="h-16 w-56 mx-4 hidden md:block fixed bottom-0 left-0 bg-white"><div v-show="hoveringg" class="animate-pulse cursor-pointer testss arroww" id="arrow">»</div></div>
      </div>
    </transition>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import linkResolver from '~/app/prismic/link-resolver'

export default {
  name: 'Navigation',
  props: {
    series: {
      type: Array,
      required: true
    },
    pages: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      linkResolver,
      hovering: false,
      hoveringg: false
    }
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    xhex (event) {
      if (event.target.scrollHeight > event.target.clientHeight) { this.hoveringg = true }
    }
  }
}
</script>

<style lang="postcss">
nav {
  @apply px-4 pt-8 fixed top-0 bg-white h-screen;
  margin-top: 152px;
  width: var(--nav-width);
  transition: transform 0.3s ease-out;

  &.collapsed {
    transform: translate(-100%, 0);
  }

  .nuxt-link-active {
    color: var(--color-magali);
  }

  & .page-link {
    font-size: 16px;
  }
}
.arroww {
  transform: rotate(90deg);
  width: min-content;
  color: #C4C4C4;
}
@media (min-height: 80rem) {
  .arroww {
  display: none;
  }
}
</style>
