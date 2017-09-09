<template>
<div class="report-list">
  <h1>🍺🍺🍺</h1>
  <button v-on:click="create">Create a dataReport</button>
  <h2>List of dataReport</h2>
  <div class="reports">
    <router-link v-for="bill in bills" class="report" :to="{ name: 'Report', params: { id: bill.key }}" :key="bill.key">{{ bill.val.topic }}</router-link>
  </div>
</div>
</template>

<script>
import * as restful from '../util/restful'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      bills: []
    }
  },
  beforeMount () {
    this.init()
  },
  methods: {
    create: function (event) {
      this.$router.push({name: 'ReportCreate'})
    },
    init () {
      this.bills = []
      restful.getDataReportList().then(snapshot => {
        snapshot.forEach(item => {
          this.bills.push({
            key: item.key,
            val: item.val()
          })
        })
      })
    }
  }
}
</script>

<style lang="scss">
.report-list {
  margin: 0 auto;
  max-width: 36rem;

  > .reports {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    > .report {
      display: inline-block;
      margin: 0.25rem;
      padding: 1rem;
      background-color: #50e3c2;
    }
  }
}
</style>
