<template>
  <div class="bill-data-report">
    <comparison-table :value.sync="model.radar"></comparison-table>
    <bar-table :value.sync="model.radar"></bar-table>
    <radar :value.sync="model.radar" ></radar>
  </div>

</template>

<script>
import ComparisonTable from '@/components/ComparisonTable'
import BarTable from '@/components/BarTable'
import Radar from '@/components/Radar'
import * as restful from '../util/restful'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      model: {}
    }
  },
  beforeMount () {
    this.init()
  },
  methods: {
    create: function (event) {
      this.$router.push({name: 'BillCreate'})
    },
    init () {
      restful.getDataReport(window.location.href.split('/').pop()).then(snapshot => {
        var data = snapshot.val()
        this.$set(this.model, 'radar', {
          features: data.actFeatures,
          bills: data.bills
        })
      })
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
