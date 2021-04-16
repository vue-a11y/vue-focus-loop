import { createApp } from 'vue'
import App from './App.vue'
import FocusLoop from '../../src'

createApp(App)
  .use(FocusLoop)
  .mount('#app')
