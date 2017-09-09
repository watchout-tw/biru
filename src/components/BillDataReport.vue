<template>
<div class="report">
  <el-row>
    <el-col :span="20">
      <h1>🍺</h1>
    </el-col>
    <el-col :span="4">
      <el-button type="text" icon="edit" @click="edit">Edit</el-button>
    </el-col>
  </el-row>
  <comparison-table :value="model.radar" :parentInitialized="initialized"></comparison-table>
  <simple-comparison-table :value="model.radar" :parentInitialized="initialized"></simple-comparison-table>
  <bar-table :value="model.radar" :parentInitialized="initialized"></bar-table>
  <radar :value="model.radar" :parentInitialized="initialized"></radar>
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
      this.$router.push({name: 'ReportCreate'})
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
    },
    edit () {
      this.$router.push({name: 'ReportCreate', params: { id: this.$route.params.id }})
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
.report {
  margin: 0 auto;
  max-width: 36rem;
}
</style>
