import Vue from "vue";
import App from "./App.vue";
import { plugin } from "vue-function-api";
import StarRating from "vue-star-rating";

Vue.config.productionTip = false;
Vue.use(plugin);
Vue.component("star-rating", StarRating);

new Vue({
  render: h => h(App)
}).$mount("#app");
