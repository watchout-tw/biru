<template>
  <div class="bill-list">
    <button v-on:click="create">Create</button>
    <ul>
      <li v-for="bill in bills">
        <router-link :to="{ name: 'BillDataReport', params: { id: bill.key }}">{{ bill.val.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Firebase from 'firebase'
import config from '../config/firebase.json'

var initConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId
}

var app = Firebase.initializeApp(initConfig)
var db = app.database()

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
      // var newKey = db.ref('dataReport').push().key
      // this.$router.push({name: 'BillDataReport', params: { id: newKey }})
      this.$router.push({name: 'BillCreate'})
    },
    init () {
      this.bills = []
      db.ref('dataReport').once('value').then(snapshot => {
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
