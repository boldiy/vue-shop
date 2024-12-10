// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios/index';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'

//设置Axios的基础url
axios.defaults.baseURL = "http://localhost:33889/";
axios.defaults.headers.common['Content-Type'] = 'application/json';
Vue.prototype.$axios=axios;

Vue.use(ElementUI);

console.log(store)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
