import Vue from 'vue'
import Router from 'vue-router'
import ReportCreate from '@/components/Bill'
import Report from '@/components/BillDataReport'
import ReportList from '@/components/BillList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ReportList',
      component: ReportList
    },
    {
      path: '/dr/:id',
      name: 'Report',
      component: Report
    },
    {
      path: '/report/:id',
      name: 'ReportCreate',
      component: ReportCreate
    }
  ]
})
