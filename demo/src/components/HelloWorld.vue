<template>
  <h1>@vue-a11y/focus-loop</h1>
  <p>
    Vue component that helps you to to trap focus in an element.
  </p>
  <button @click="activeTrap = !activeTrap">
    {{ activeTrap ? 'Hide' : 'Show' }} links with focus loop
  </button>
  <FocusLoop
    v-show="activeTrap"
    :isVisible="activeTrap"
  >
    <ul class="links">
      <li v-for="link in links" :key="link.label">
        <a
          :href="link.href"
          target="_blank"
          rel="noopener"
        >
          {{ link.label }}
        </a>
      </li>
      <li style="margin-top: 20px;">
        <button @click="activeTrap = false">
          Close
        </button>
      </li>
    </ul>
  </FocusLoop>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { FocusLoop } from '../../../src'

export default defineComponent({
  name: 'HelloWorld',

  components: {
    FocusLoop
  },

  setup () {
    const activeTrap = ref(false)
    const links = ref([
      { label: 'Core Docs', href: 'https://vuejs.org' },
      { label: 'Forum', href: 'https://forum.vuejs.org' },
      { label: 'Community chat', href: 'https://chat.vuejs.org' },
      { label: 'Twitter', href: 'https://twitter.com/vuejs' },
      { label: 'News', href: 'https://news.vuejs.org' },
    ])

    return {
      links,
      activeTrap
    }
  }
})
</script>

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