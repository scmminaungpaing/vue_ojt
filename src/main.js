import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, HasError, AlertError } from 'vform'

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

Vue.component('pagination', require('laravel-vue-pagination'));
Vue.config.productionTip = false;

window.Form = Form;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // axios.defaults.withCredentials = true;
    axios.interceptors.request.use(
        function (config) {
            if (store.state.user) {
                const token = localStorage.getItem("token");
                if (token) config.headers.Authorization ="Bearer " + token;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
  },
}).$mount('#app')
