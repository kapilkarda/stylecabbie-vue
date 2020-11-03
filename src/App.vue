<script>
import Vue from 'vue';

import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';
import FontPicker from 'font-picker-vue';
import Checkbox from 'primevue/checkbox';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';

Vue.component('TabView',TabView);
Vue.component('TabPanel',TabPanel);
Vue.component('InputText',InputText);
Vue.component('Slider',Slider);
Vue.component('FontPicker',FontPicker);
Vue.component('Checkbox',Checkbox);
Vue.component('FileUpload',FileUpload);
Vue.component('Button',Button);


import Home from './components/Home.vue';
import Mobile from './components/Mobile.vue';
import Tshirt from './components/Tshirt.vue';
const routes = {
  '/': Home,
  '/Mobile': Mobile,
  '/Tshirt':Tshirt
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || Home
    }
  },
  render (h) { return h(this.ViewComponent) }
})




export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
span.p-field {
    display: flex;
    flex-direction: column;
}
.p-hidden-accessible {
    visibility: hidden;
}
.p-checkbox-box.p-highlight {
    margin-top: -17px;
}
</style>
