import Vue from 'vue'
import Router from 'vue-router'

// import Home from '../components/home/home'

Vue.use(Router)

const Home = (resolve) => {
  import('components/home/home').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    }
  ]
})