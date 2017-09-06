import Vue from 'vue'
import Router from 'vue-router'
import BillDataReport from '@/components/BillDataReport'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BillDataReport',
      component: BillDataReport
    }
  ]
})
