import FocusLoop from './FocusLoop.vue'

let installed: boolean = false

export default function install (app: any): void {
  if (installed) return
  installed = true
  app.component('FocusLoop', FocusLoop)
}

// auto install
if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
  window.Vue.use(install)
}