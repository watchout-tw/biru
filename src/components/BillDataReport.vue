<template>
  <div class="bill-data-report">
    <comparison-table></comparison-table>
    <bar-table></bar-table>
    <radar :value.sync="test" ></radar>
  </div>

</template>

<script>
import ComparisonTable from '@/components/ComparisonTable'
import BarTable from '@/components/BarTable'
import Radar from '@/components/Radar'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    ComparisonTable,
    BarTable,
    Radar
  }
}
</script>

<style lang="scss">

</style>
