import Vue from 'vue'
import './plugins/vuetify'
import router from "./router";
import i18n from "./i18n";
import store from "./store";
import "./vee-validate";
import App from './App.vue'
import axiosMock from './utilities/AxiosMock';
import axiosObj from './axiosObj'
import '@babel/polyfill'

Vue.config.productionTip = false

// axiosオブジェクトの設定
Vue.prototype.$axios = (process.env.VUE_APP_MOCK_MODE === 'true') ? axiosMock : axiosObj;

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app');





