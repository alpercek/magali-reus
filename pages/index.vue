<template>
  <section v-if="!$fetchState.pending" class="index overflow-hidden">
    <div class="mb-12">
      <prismic-rich-text :field="home.data.announcements_title" class="md:pr-2 pb-2 px-4 sm:px-0 font-bold text-magali" />
      <client-only>
        <Announcements
          :field="home.data.announcements"
          onclick="const slides = document.getElementsByClassName('slices')
        if (slides.length > 0) {
        for (let index = 0; index < slides.length+1; index++) {
        slides[index].remove()
        console.log(index)
      }
    }"
        />
      </client-only>
    </div>
    <!-- Random work slider -->
    <HomeSlices :slices="home.data.body" />
    <!--  -->
  </section>
</template>

<script>
import { mapState } from 'vuex'
import linkResolver from '~/app/prismic/link-resolver'
import HomeSlices from '@/components/slices/HomeSlices'
import Announcements from '~/components/Announcements.vue'
// import Announcements from '@/components/Announcements.vue'

export default {
  name: 'Index',
  components: { HomeSlices, Announcements },
  layout: false,
  data () {
    return {
      linkResolver,
      home: null,
      news: null
    }
  },
  async fetch () {
    this.home = await this.$prismic.api.getSingle('home')
    this.news = await this.$prismic.api.getByUID('page', 'news')
  },
  head () {
    return {
      title: 'Home'
    }
  },
  computed: {
    ...mapState(['main'])
  }
}

</script>
