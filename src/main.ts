import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import router from "./router";
import VueResource from "vue-resource";
import VueCookies from "vue-cookies";
import mdiVue from "mdi-vue/v2";
import * as mdijs from "@mdi/js";
import dotenv from "dotenv";

dotenv.config();

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(mdiVue, {
  icons: mdijs,
});
Vue.use(VueCookies);

Vue.http.interceptors.push((request: Request) => {
  if (Vue.$cookies.isKey("budgenvtoken"))
    request.headers.set(
      "Authorization",
      "Bearer " + Vue.$cookies.get("budgenvtoken")
    );
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
