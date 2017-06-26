// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './router.config.js'

import './assets/less/reset.css'
// import './assets/less/fonts.css'
import './assets/less/index.css'
import './assets/less/animate.css'

Vue.use(VueRouter)
Vue.use(VueResource)
const router = new VueRouter(routerConfig)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
