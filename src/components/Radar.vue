<template>
<div class="radar">
  <h2>radar</h2>
  <div class="buttons">
    <button v-for="(bill, index) in bills" @click="draw(index)">{{bill.name}}</button>
  </div>
</div>
</template>

<script>
import * as radar from '@/util/radar'

const getMaxScore = function (array) {
  var max = 0
  for (let i of array) {
    if (i.score) {
      max = max >= i.score ? max : i.score
    }
  }
  return max * 1.01
}

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
        var maxValue = getMaxScore(content)
        var options = {
          maxValue: maxValue,
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
.radar {
  margin: 0 auto 4rem;
}
</style>
