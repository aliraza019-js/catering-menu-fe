import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "../public/styles/global.scss";
import { EventBus } from "./eventBus";
// import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

// Register EventBus as a Vue prototype
Vue.prototype.$bus = EventBus;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
