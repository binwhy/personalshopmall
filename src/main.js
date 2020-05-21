import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//bus 事件总线 定义一个$bus
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
