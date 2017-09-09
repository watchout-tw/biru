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
        <td>radar figure here</td>
        <td v-for="act in bill.act_features">{{act.short_content}}</td>
      </tr>
    </table>
    <p>Simple table description.</p>
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
