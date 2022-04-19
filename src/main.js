import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import {Button} from 'mint-ui'
import 'mint-ui/lib/style.css'
import './mock/mockServer'
import './fiters/index'

Vue.component(Button.name, Button)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
