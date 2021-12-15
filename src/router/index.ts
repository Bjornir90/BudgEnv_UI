import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  /*{
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },*/
  {
    path: "/transactions",
    name: "Transactions list",
    component: () => import("../views/Transactions.vue"),
  },
  /*{
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }*/
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
