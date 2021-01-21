import { App } from 'vue'
import FocusLoop from './FocusLoop.vue'

export default function install (app: App): void {
  app.component('FocusLoop', FocusLoop)
}

export { FocusLoop }
