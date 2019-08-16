import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Polyfil from './plugins/DynamicComponent'

Vue.use(Polyfil)
Vue.config.productionTip = false

const vm = new Vue({
  a: 111,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(vm)
vm.$options.a = 11
