<template>
  <div class="comparison-table">
    <h1>I am title</h1>
    <table>
      <tr>
        <th>bill name/feature</th>
        <th v-for="feature in model.features">{{feature.feature}}</th>
      </tr>
      <tr v-for="(bill, index) in model.bills">
        <td>Bill {{index}}</td>
        <td v-for="act in bill.act_features">{{act.content}}</td>
      </tr>
    </table>
    <p>I am description</p>
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
    }
  }
}
</script>

<style lang="scss">
.comparison-table{
  table, th, td{
    border: 1px solid black;
    border-collapse: collapse;
    padding: 5px;
    margin: 0 auto;
  }
}
</style>
