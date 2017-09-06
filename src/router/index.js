import Vue from 'vue'
import Router from 'vue-router'
import BillDataReport from '@/components/BillDataReport'
import BillList from '@/components/BillList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BillList',
      component: BillList
    },
    {
      path: '/:id',
      name: 'BillDataReport',
      component: BillDataReport
    }
  ]
})
