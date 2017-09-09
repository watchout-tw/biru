import Vue from 'vue'
import Router from 'vue-router'
import BillCreate from '@/components/BillCreate'
import BillDataReport from '@/components/BillDataReport'
import BillList from '@/components/BillList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BillList',
      component: BillList
    },
    {
      path: '/dr/:id',
      name: 'BillDataReport',
      component: BillDataReport
    },
    {
      path: '/create',
      name: 'BillCreate',
      component: BillCreate
    }
  ]
})
