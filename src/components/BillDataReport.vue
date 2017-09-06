<template>
  <div class="bill-data-report">
    <figure-a></figure-a>
    <figure-b></figure-b>
    <radar :value.sync="test" ></radar>
  </div>

</template>

<script>
import FigureA from '@/components/FigureA'
import FigureB from '@/components/FigureB'
import Radar from '@/components/Radar'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    FigureA,
    FigureB,
    Radar
  }
}
</script>

<style lang="scss">

</style>
