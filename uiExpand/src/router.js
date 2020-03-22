import Vue from 'vue';
import Router from 'vue-router';

// import Ventures from './views/Venture.vue';
const Ventures = () => import('./views/Venture.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/ventures',
      name: 'ventures',
      /*
      component: () => import(
        // webpackChunkName: "Ventures"
        './views/Venture.vue')
        */
      component: Ventures
    },
    {
      path: '/coding',
      name: 'coding',
    },
    {
      path: '/finance',
      name: 'finance',
    },
    {
      path: '/design',
      name: 'design',
    }
  ]
});
