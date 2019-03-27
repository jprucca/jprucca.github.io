import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

window.vm = new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
