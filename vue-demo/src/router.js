import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MockWXTemplate from './views/MockWXTemplate.vue'
import TestVueLoader from './views/TestVueLoader.vue'

Vue.use(Router)




export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/mock-wx-template',
      name: 'mock-wx-template',
      component: MockWXTemplate
    },
    {
      path: '/test-vue-loader',
      name: 'test-vue-loader',
      component: TestVueLoader
    }
  ]
})
