<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Vue component that helps you to to trap focus in an element.
    </p>
    <button @click="activeTrap = !activeTrap">
      {{ activeTrap ? 'Hide' : 'Show' }} links with focus loop
    </button>
    <FocusLoop v-if="activeTrap">
      <ul class="links">
        <li>
          <a
            href="https://vuejs.org"
            target="_blank"
            rel="noopener"
          >Core Docs</a>
        </li>
        <li>
          <a
            href="https://forum.vuejs.org"
            target="_blank"
            rel="noopener"
          >Forum</a>
        </li>
        <li>
          <a
            href="https://chat.vuejs.org"
            target="_blank"
            rel="noopener"
          >Community Chat</a>
        </li>
        <li>
          <a
            href="https://twitter.com/vuejs"
            target="_blank"
            rel="noopener"
          >Twitter</a>
        </li>
        <li>
          <a
            href="https://news.vuejs.org"
            target="_blank"
            rel="noopener"
          >News</a>
        </li>
        <li style="margin-top: 20px;">
          <button @click="activeTrap = false">
            Close
          </button>
        </li>
      </ul>
    </FocusLoop>
  </div>
</template>

<script>
import { FocusLoop } from '../../vue-focus-loop'

export default {
  name: 'HelloWorld',

  components: {
    FocusLoop
  },

  props: {
    msg: String
  },

  data: () => ({
    activeTrap: false
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #333;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  margin-bottom: 10px;
}
.links {
  background-color: #f2f2f2;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
