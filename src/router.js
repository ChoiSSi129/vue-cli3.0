import Vue from 'vue'
import Router from 'vue-router'
import List from './views/List.vue'
import Data from "./data.json"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List,
      props: {Data}
    }
  ]
})
