import Vue from 'vue'
import App from './App.vue'
import VueFocusLoop from '../../src'

Vue.config.productionTip = false
Vue.use(VueFocusLoop)

new Vue({
  render: h => h(App)
}).$mount('#app')
