<template>
  <div class="bar-table">
    <h2>barTable</h2>
    <button v-for="feature in model.features" @click="updateTable(feature.feature)">{{feature.feature}}</button>
    <table>
      <tr>
        <th colspan="1"></th>
        <th v-for="n in max + 1" colspan="2">{{n - 1}}</th>
      </tr>
      <tr v-for="item in score">
        <td colspan="2">{{item.name}}</td>
        <td v-for="n in item.score" colspan="2" class="score"></td>
        <td v-for="n in max - item.score" colspan="2" class="no-score"></td>
        <td colspan="1"></td>
      </tr>
    </table>
    <p>I am bar table description.</p>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      model: this.value,
      max: 0,
      score: []
    }
  },
  beforeMount () {
    this.model = this.value
  },
  watch: {
    'value' () {
      this.pull()
    }
  },
  mounted () {
    this.pull()
  },
  methods: {
    pull () {
      this.model = this.value
      this.score = []
      if (this.model) {
        this.updateTable(this.model.features[0].feature)
      }
    },
    updateTable (featureName) {
      this.score = []
      this.max = 0
      for (let i of this.model.bills) {
        for (let feature of i.act_features) {
          if (feature.act_feature_title === featureName) {
            this.score.push({
              'score': feature.score,
              'name': feature.content
            })
            this.max = this.max >= feature.score ? this.max : feature.score
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.bar-table {
  margin: 0 0 4rem;

  table {
    width: 50%;
    margin: 0;
  }
  th, td {
    margin: 5px;
    border-collapse: collapse;
    width: 14.285%;
  }
  .score {
    background-color: #50e3c2;
  }
  .no-score {
    background-color: #eee;
  }
}
</style>
