import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AdminLogin from './views/AdminLogin.vue'
import AdminInput from './views/AdminInput.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin/login',
      name: 'adminlogin',
      component: AdminLogin
    },
    {
      path: '/admin/input',
      name: 'admininput',
      component: AdminInput,
      beforeEnter: (to, from, next) => {
        let status = localStorage.getItem('status')
        if (status !== 'connected') {
          next('/')
        } else {
          next()
        }
      }
    }
  ]
})
