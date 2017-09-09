<template>
<div class="figure-radar">
  <div class="buttons">
    <button v-for="(bill, index) in bills" @click="draw(index)">billIndex = {{ index }}</button>
  </div>
</div>
</template>

<script>
import * as radar from '@/util/radar'

export default {
  props: ['value', 'parentInitialized'],
  data () {
    return {
      mounted: false
    }
  },
  computed: {
    bills () {
      return this.value ? this.value.bills : []
    }
  },
  watch: {
    'parentInitialized' () {
      this.draw(0)
    },
    'mounted' () {
      this.draw(0)
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    draw (billIndex) {
      if (this.parentInitialized && this.mounted && billIndex < this.bills.length) {
        const bill = this.bills[billIndex]
        var radarInfo = []
        var content = []
        for (let i of bill.act_features) {
          content.push({
            feature: i.act_feature_title,
            score: i.score
          })
        }
        radarInfo.push(content)
        var options = {
          maxValue: 10,
          levels: 5,
          segments: false
        }
        radar.draw(this.$el, radarInfo, options, this.$el)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
