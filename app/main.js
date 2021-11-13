import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from "./store";
import VeeValidate, { Validator } from 'vee-validate';
import es from 'vee-validate/dist/locale/es'
import Vuex from 'vuex';
import SuiVue from 'semantic-ui-vue';
Vue.config.productionTip = false;
Vue.use(VeeValidate);
Validator.localize("es", es);
Vue.use(Vuex);
Vue.use(SuiVue);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

