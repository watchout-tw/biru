<template>
  <svg width=300 height=300 id="radar">
    <polygon style="fill:green;stroke:purple;stroke-width:1" points="050,300 150,100 250,300" />
  </svg>
</template>

<script>
import d3 from 'd3'

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
      var svg = d3.select('#radar')
      console.log(svg)
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
