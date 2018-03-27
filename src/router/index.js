import Vue from 'vue'
import Router from 'vue-router'
import UserMsg from '@/components/user-msg'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user',
      name: 'user-msg',
      component: UserMsg
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
