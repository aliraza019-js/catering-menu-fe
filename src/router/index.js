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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
