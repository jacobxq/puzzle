import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'common/css/normail.scss'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
