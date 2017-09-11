<template>
  <div class="simple-comparison-table">
    <h2>simpleTable</h2>
    <table>
      <tr>
        <th>bill\feature</th>
        <th>radar</th>
        <th v-for="feature in model.features">{{feature.feature}}</th>
      </tr>
      <tr v-for="(bill, index) in model.bills">
        <td>{{bill.name}}</td>
        <td><div v-bind:id="'radar' + index" v-bind:ref="'radar' + index"></div></td>
        <td v-for="act in bill.act_features">{{act.short_content}}</td>
      </tr>
    </table>
    <p>Simple table description.</p>
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
  return Math.max(max, 5) * 1.02
}

export default {
  props: ['value', 'parentInitialized'],
  data () {
    return {
      mounted: false
    }
  },
  computed: {
    model () {
      return this.value
    }
  },
  watch: {
    'parentInitialized' () {
      this.drawAll()
    },
    'mounted' () {
      this.drawAll()
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    drawAll () {
      for (let i = 0; i < this.model.bills.length; i++) {
        this.$nextTick(() => {
          this.draw(i)
        })
      }
    },
    draw (billIndex) {
      if (this.parentInitialized && this.mounted && billIndex < this.model.bills.length) {
        const bill = this.model.bills[billIndex]
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
          w: 150,
          h: 150,
          maxValue: maxValue,
          levels: 5,
          segments: false
        }
        radar.draw(this.$el.querySelector('#radar' + billIndex), radarInfo, options, this.$el.querySelector('#radar' + billIndex))
      }
    }
  }
}
</script>

<style lang="scss">
.simple-comparison-table{
  margin: 0 auto 4rem;

  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 5px;
    margin: 0;
  }
}
</style>
