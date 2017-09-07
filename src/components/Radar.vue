<template>
  <div class="figure-radar">
    <button @click="draw">draw</button>
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
    draw () {
      var d = [
        [
          {feature: 'cat', score: 0.04},
          {feature: 'dog', score: 0.03},
          {feature: 'pig', score: 0.07},
          {feature: 'fish', score: 0.01},
          {feature: 'ant', score: 0.02},
          {feature: 'bird', score: 0.08}
        ]
      ]
      var options = {
        maxValue: 0.1,
        levels: 5,
        segments: false
      }
      radar.draw('#radar', d, options)
      return
    },
    pull () {
      this.model = this.value
      this.draw()
    }
  }
}
</script>

<style lang="scss">

</style>
