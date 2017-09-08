<template>
  <div class="bill-list">
    <button v-on:click="create">Create</button>
    <ul>
      <li v-for="bill in bills">
        <router-link :to="{ name: 'BillDataReport', params: { id: bill.key }}">{{ bill.val.topic }}</router-link>
      </li>
    </ul>
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
      this.$router.push({name: 'BillCreate'})
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

</style>
