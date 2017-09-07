<template>
  <div class="bill-data-report">
    <comparison-table></comparison-table>
    <figure-b></figure-b>
    <radar :value.sync="test" ></radar>
  </div>

</template>

<script>
import ComparisonTable from '@/components/ComparisonTable'
import FigureB from '@/components/FigureB'
import Radar from '@/components/Radar'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    ComparisonTable,
    FigureB,
    Radar
  }
}
</script>

<style lang="scss">

</style>
