import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import {TweenMax, Power2, TimelineLite} from "gsap"
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#wrap')
