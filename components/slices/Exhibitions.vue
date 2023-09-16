<template>
  <section v-if="!$fetchState.pending">
    <Collapsible
      v-for="section in sections"
      :key="section.title.replace(' ', '-')"
      icon-class="icon small"
      class="cv_section md:pr-4"
      :is-open="isOpen"
      no-check
    >
      <h1 slot="title" class="md:pr-2 text-magali ">
        {{ section.title }}
      </h1>

      <div slot="content" class="md:hidden">
        <div
          v-for="exhibition, j in section.dates"
          :key="j"
          class="w-full"
        >
          <div
            v-if="exhibition.data.slides.length > 0"
            class="w-full block md:hidden"
          >
            <Slider
              :slides="exhibition.data.slides"
              :uid="exhibition.uid || 'a'"
            />
          </div>
          <table
            class="items cursor-pointer"
          >
            <tbody>
              <tr
                class="hover:text-magali"
              >
                <td>
                  {{ dateFormat(exhibition.data.vernissage) }}
                </td>
                <td>
                  <prismic-rich-text class="tight" :field="exhibition.data.title" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <table
        slot="content"
        class="items cursor-pointer hidden md:block"
      >
        <tbody>
          <template v-for="exhibition, j in section.dates">
            <tr
              :key="j"
              class="hover:text-magali"
              @mouseenter="setPreviewing(exhibition)"
            >
              <td style="width: 140px">
                {{ dateFormat(exhibition.data.vernissage) }}
              </td>
              <td>
                <prismic-rich-text class="tight" :field="exhibition.data.title" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </Collapsible>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Collapsible from '@/components/Collapsible.vue'
import Slider from '@/components/Slider.vue'

export default {
  name: 'Exhibitions',
  components: {
    Collapsible,
    Slider
  },
  props: {
    slice: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      sections: {
        upcoming: {
          title: 'Upcoming exhibitions',
          dates: []
        },
        current: {
          title: 'Current Exhibitions',
          dates: []
        }
      }
    }
  },
  async fetch () {
    const exhibitions = await this.$prismic.api.getByIDs(this.slice.items.map(i => i.exhibition.id))
    const items = this.slice.items.map(i => exhibitions.results.find(p => p.id === i.exhibition.id))
    const today = new Date()

    this.sections.upcoming.dates = items.filter((item) => {
      return new Date(item.data.vernissage) >= today
    })

    this.sections.current.dates = items.filter((item) => {
      return new Date(item.data.finissage) >= today || (new Date(item.data.vernissage) <= today && !item.data.finissage)
    })

    if (this.sections.upcoming.dates.length === 0) {
      delete this.sections.upcoming
    }

    if (this.sections.current.dates.length === 0) {
      delete this.sections.current
    }
  },
  methods: {
    ...mapActions({ setPreviewing: 'main/SET_PREVIEWING' }),
    dateFormat (d) {
      let locale = 'nl-nl'
      if (window.navigator.languages !== undefined) {
        locale = window.navigator.languages[0]
      }
      const r = new Date(d).toLocaleDateString(locale, { year: '2-digit', month: '2-digit', day: '2-digit' })
      return r
    }
  }
}
</script>
