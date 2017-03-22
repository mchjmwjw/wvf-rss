import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import Home from './components/Home.vue'
import Search from './components/Search.vue'
import 'font-awesome-webpack'
import VueResource from 'vue-resource'
import store from './store'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home},
  { path: '/search', component: Search }
]
const router = new VueRouter({ routes })

new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
