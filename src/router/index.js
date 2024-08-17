import Vue from "vue";
import VueRouter from "vue-router";
import Success from "../views/Success.vue";
import Cancel from "../views/Cancel.vue";
import Checkout from "../views/checkout.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/HomeView.vue"),
  },
  {
    path: "/success",
    name: "Success",
    component: Success,
  },
  {
    path: "/cancel",
    name: "Cancel",
    component: Cancel,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
