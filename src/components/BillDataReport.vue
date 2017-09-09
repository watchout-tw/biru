<template>
<div class="bill-data-report">
  <comparison-table :value.sync="model.radar" :parentInitialized="initialized"></comparison-table>
  <simple-comparison-table :value.sync="model.radar" :parentInitialized="initialized"></simple-comparison-table>
  <bar-table :value.sync="model.radar" :parentInitialized="initialized"></bar-table>
  <radar :value.sync="model.radar" :parentInitialized="initialized"></radar>
</div>
</template>

<script>
import ComparisonTable from '@/components/ComparisonTable'
import SimpleComparisonTable from '@/components/SimpleComparisonTable'
import BarTable from '@/components/BarTable'
import Radar from '@/components/Radar'
import * as restful from '../util/restful'

export default {
  data () {
    return {
      initialized: false,
      model: {}
    }
  },
  mounted () {
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
        this.initialized = true
      })
    }
  },
  components: {
    ComparisonTable,
    SimpleComparisonTable,
    BarTable,
    Radar
  }
}
</script>

<style lang="scss">
</style>
