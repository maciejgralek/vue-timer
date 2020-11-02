import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { store } from './store.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import jscookie from 'js-cookie'

Vue.config.productionTip = false

Vue.prototype.dburl = "http://" + window.location.host;
Vue.prototype.$http = axios;
Vue.prototype.$cookie = jscookie;

Vue.mixin({
  data: function () {
    return {
      // store,
      state: store.state
    };
  },
  watch: {
    'store.debug': function(oldValue, newValue) {
      console.log("debug ", newValue);
      if (this.$el) {
        newValue ? 
          this.$el.className += " border" :
          this.$el.className -= " border";
      }
    }
  },
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
