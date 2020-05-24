import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import toast from "./components/common/toast/index.js";

Vue.config.productionTip = false
//bus 事件总线 定义一个$bus
Vue.prototype.$bus = new Vue()

//注册一个全局的toast 以插件的形式进行注册
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
