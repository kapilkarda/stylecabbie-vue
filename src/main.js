import Vue from 'vue'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import App from './App.vue'
import VueKonva from 'vue-konva';
Vue.use(VueKonva);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
