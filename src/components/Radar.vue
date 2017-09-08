<template>
  <div class="figure-radar">
    <button v-for="bill in model.bills" @click="draw(bill)">biil</button>
    <div id="radar">i am radar</div>
  </div>
</template>

<script>
import * as radar from '@/util/radar'

export default {
  props: ['value', 'model'],
  data () {
    return {
      model: this.value
    }
  },
  beforeMount () {
    this.pull()
  },
  watch: {
    'value' () {
      this.pull()
    }
  },
  methods: {
    draw (bill) {
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
      radar.draw('#radar', radarInfo, options)
      return
    },
    pull () {
      this.model = this.value
      console.log('pull value')
      this.draw()
    }
  }
}
</script>

<style lang="scss">

</style>
