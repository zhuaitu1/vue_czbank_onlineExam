import Vue from 'vue'
import Router from 'vue-router'
import login from '@/containers/login/login'
import main from '@/containers/main/main'
import changePass from '@/containers/main/personalCenter/changePass'
import homepage from '@/containers/main/homepage/index'
import information from '@/containers/main/information/informationView'
import examCard from '@/containers/main/examCard/index'
import UserManagement from '@/containers/main/UserManagement/StudentManagement'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    // {
    //   path: '/homepage',
    //   name: 'homepage',
    //   component: homepage,
    // },
    {
      path: '/main',
      name: 'main',
      component: main,
      children: [
        {
          path: 'exam/:paperId/:questionId',
          component: examCard,
        },
        {
          path: 'homepage',
          component: homepage,
        },
        {
          path: 'personalCenter/changePass',
          name: 'changePass',
          component: changePass,
        },
        {
          path: 'information/informationView',
          name: 'informationView',
          component: information,
        },
        {
          path:'UserManagement/StudentManagement',
          name:'StudentManagement',
          component:UserManagement,
        }
      ]
    }
  ]
})
