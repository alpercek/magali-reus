<template>
  <div :id="`cn-${i}`" :key="i" class="toggle-children custom-number relative block w-5 h-5 sm:w-4 sm:h-4 cursor-pointer" :class="{ active }" @click="$emit('clicked', i - 1)">
    <component
      :is="`Number${i}${active ? 'Inv' : ''}`"
    />
  </div>
</template>

<script>
import Number1 from '@/components/numbers/1.vue'
import Number1Inv from '@/components/numbers/1inv.vue'
import Number2 from '@/components/numbers/2.vue'
import Number2Inv from '@/components/numbers/2inv.vue'
import Number3 from '@/components/numbers/3.vue'
import Number3Inv from '@/components/numbers/3inv.vue'
import Number4 from '@/components/numbers/4.vue'
import Number4Inv from '@/components/numbers/4inv.vue'
import Number5 from '@/components/numbers/5.vue'
import Number5Inv from '@/components/numbers/5inv.vue'
import Number6 from '@/components/numbers/6.vue'
import Number6Inv from '@/components/numbers/6inv.vue'
import Number7 from '@/components/numbers/7.vue'
import Number7Inv from '@/components/numbers/7inv.vue'
import Number8 from '@/components/numbers/8.vue'
import Number8Inv from '@/components/numbers/8inv.vue'
import Number9 from '@/components/numbers/9.vue'
import Number9Inv from '@/components/numbers/9inv.vue'
import Number10 from '@/components/numbers/10.vue'
import Number10Inv from '@/components/numbers/10inv.vue'
import Number11 from '@/components/numbers/11.vue'
import Number11Inv from '@/components/numbers/11inv.vue'
import Number12 from '@/components/numbers/12.vue'
import Number12Inv from '@/components/numbers/12inv.vue'
import Number13 from '@/components/numbers/13.vue'
import Number13Inv from '@/components/numbers/13inv.vue'
import Number14 from '@/components/numbers/14.vue'
import Number14Inv from '@/components/numbers/14inv.vue'
import Number15 from '@/components/numbers/15.vue'
import Number15Inv from '@/components/numbers/15inv.vue'
import Number16 from '@/components/numbers/16.vue'
import Number16Inv from '@/components/numbers/16inv.vue'
import Number17 from '@/components/numbers/17.vue'
import Number17Inv from '@/components/numbers/17inv.vue'
import Number18 from '@/components/numbers/18.vue'
import Number18Inv from '@/components/numbers/18inv.vue'
import Number19 from '@/components/numbers/19.vue'
import Number19Inv from '@/components/numbers/19inv.vue'
import Number20 from '@/components/numbers/20.vue'
import Number20Inv from '@/components/numbers/20inv.vue'
import Number21 from '@/components/numbers/21.vue'
import Number21Inv from '@/components/numbers/21inv.vue'
import Number22 from '@/components/numbers/22.vue'
import Number22Inv from '@/components/numbers/22inv.vue'
import Number23 from '@/components/numbers/23.vue'
import Number23Inv from '@/components/numbers/23inv.vue'
import Number24 from '@/components/numbers/24.vue'
import Number24Inv from '@/components/numbers/24inv.vue'
import Number25 from '@/components/numbers/25.vue'
import Number25Inv from '@/components/numbers/25inv.vue'
import Number26 from '@/components/numbers/26.vue'
import Number26Inv from '@/components/numbers/26inv.vue'
import Number27 from '@/components/numbers/27.vue'
import Number27Inv from '@/components/numbers/27inv.vue'
import Number28 from '@/components/numbers/28.vue'
import Number28Inv from '@/components/numbers/28inv.vue'
import Number29 from '@/components/numbers/29.vue'
import Number29Inv from '@/components/numbers/29inv.vue'
import Number30 from '@/components/numbers/30.vue'
import Number30Inv from '@/components/numbers/30inv.vue'
import Number31 from '@/components/numbers/31.vue'
import Number31Inv from '@/components/numbers/31inv.vue'
import Number32 from '@/components/numbers/32.vue'
import Number32Inv from '@/components/numbers/32inv.vue'
import Number33 from '@/components/numbers/33.vue'
import Number33Inv from '@/components/numbers/33inv.vue'
import Number34 from '@/components/numbers/34.vue'
import Number34Inv from '@/components/numbers/34inv.vue'
import Number35 from '@/components/numbers/35.vue'
import Number35Inv from '@/components/numbers/35inv.vue'
import Number36 from '@/components/numbers/36.vue'
import Number36Inv from '@/components/numbers/36inv.vue'
import Number37 from '@/components/numbers/37.vue'
import Number37Inv from '@/components/numbers/37inv.vue'
import Number38 from '@/components/numbers/38.vue'
import Number38Inv from '@/components/numbers/38inv.vue'
import Number39 from '@/components/numbers/39.vue'
import Number39Inv from '@/components/numbers/39inv.vue'
import Number40 from '@/components/numbers/40.vue'
import Number40Inv from '@/components/numbers/40inv.vue'
import Number41 from '@/components/numbers/41.vue'
import Number41Inv from '@/components/numbers/41inv.vue'
import Number42 from '@/components/numbers/42.vue'
import Number42Inv from '@/components/numbers/42inv.vue'
import Number43 from '@/components/numbers/43.vue'
import Number43Inv from '@/components/numbers/43inv.vue'
import Number44 from '@/components/numbers/44.vue'
import Number44Inv from '@/components/numbers/44inv.vue'
import Number45 from '@/components/numbers/45.vue'
import Number45Inv from '@/components/numbers/45inv.vue'
import Number46 from '@/components/numbers/46.vue'
import Number46Inv from '@/components/numbers/46inv.vue'
import Number47 from '@/components/numbers/47.vue'
import Number47Inv from '@/components/numbers/47inv.vue'
import Number48 from '@/components/numbers/48.vue'
import Number48Inv from '@/components/numbers/48inv.vue'
import Number49 from '@/components/numbers/49.vue'
import Number49Inv from '@/components/numbers/49inv.vue'
import Number50 from '@/components/numbers/50.vue'
import Number50Inv from '@/components/numbers/50inv.vue'

export default {
  components: {
    Number1,
    Number1Inv,
    Number2,
    Number2Inv,
    Number3,
    Number3Inv,
    Number4,
    Number4Inv,
    Number5,
    Number5Inv,
    Number6,
    Number6Inv,
    Number7,
    Number7Inv,
    Number8,
    Number8Inv,
    Number9,
    Number9Inv,
    Number10,
    Number10Inv,
    Number11,
    Number11Inv,
    Number12,
    Number12Inv,
    Number13,
    Number13Inv,
    Number14,
    Number14Inv,
    Number15,
    Number15Inv,
    Number16,
    Number16Inv,
    Number17,
    Number17Inv,
    Number18,
    Number18Inv,
    Number19,
    Number19Inv,
    Number20,
    Number20Inv,
    Number21,
    Number21Inv,
    Number22,
    Number22Inv,
    Number23,
    Number23Inv,
    Number24,
    Number24Inv,
    Number25,
    Number25Inv,
    Number26,
    Number26Inv,
    Number27,
    Number27Inv,
    Number28,
    Number28Inv,
    Number29,
    Number29Inv,
    Number30,
    Number30Inv,
    Number31,
    Number31Inv,
    Number32,
    Number32Inv,
    Number33,
    Number33Inv,
    Number34,
    Number34Inv,
    Number35,
    Number35Inv,
    Number36,
    Number36Inv,
    Number37,
    Number37Inv,
    Number38,
    Number38Inv,
    Number39,
    Number39Inv,
    Number40,
    Number40Inv,
    Number41,
    Number41Inv,
    Number42,
    Number42Inv,
    Number43,
    Number43Inv,
    Number44,
    Number44Inv,
    Number45,
    Number45Inv,
    Number46,
    Number46Inv,
    Number47,
    Number47Inv,
    Number48,
    Number48Inv,
    Number49,
    Number49Inv,
    Number50,
    Number50Inv
  },
  props: {
    i: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="postcss">
.custom-number {
  margin-right: 2px;
}
</style>
