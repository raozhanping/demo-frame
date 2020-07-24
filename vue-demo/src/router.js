import Vue from 'vue'
import Router from './plugins/vue-router'
import Home from './views/Home.vue'
import Example from './views/Example'
import MockWXTemplate from './views/MockWXTemplate'
import TestVueLoader from './views/TestVueLoader'
import LessDemo from './views/LessDemo/LessDemo'

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
      path: '/example',
      name: 'example',
      component: Example
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About')
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
    },
    {
      path: '/less-demo',
      name: 'less-demo',
      component: LessDemo
    }
  ]
})
