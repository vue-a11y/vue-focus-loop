<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/vue-a11y-logo.png"
    >
    <HelloWorld msg="@vue-a11y/focus-loop" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
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

[tabindex]:not([tabindex="-1"]), a, button, input, select, textarea {
  position: relative;
  z-index: 2;
  outline-width: 3px !important;
  outline-style: dotted !important;
  outline-color: transparent !important;
  outline-offset: 6px;
  transition: outline-offset .1s ease;
}

*:focus {
  outline-color: #333 !important;
  outline-offset: 2px;
}

[tabindex="-1"] {
  outline: 0 !important;
}
</style>
