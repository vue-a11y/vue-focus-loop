<template>
  <div class="vue-focus-loop">
    <div
      class="vue-focus-loop__start"
      :tabindex="getTabindex"
      @focus="handleFocusStart"
    />
    <div ref="focusLoop">
      <slot />
    </div>
    <div
      class="vue-focus-loop__end"
      :tabindex="getTabindex"
      @focus="handleFocusEnd"
    />
  </div>
</template>

<script>
const focusableElementsSelector = `[tabindex]:not([tabindex^="-"]), a[href], audio[controls], ${['input', 'select', 'button', 'textarea'].map(field => `${field}:not([disabled])`).join(', ')}`

export default {
  name: 'FocusLoop',

  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      alreadyFocused: false
    }
  },

  computed: {
    getTabindex () {
      return this.disabled ? -1 : 0
    }
  },

  methods: {
    getFocusableElements () {
      const focusableElements = this.$refs.focusLoop.querySelectorAll(focusableElementsSelector)
      if (focusableElements && focusableElements.length) return focusableElements
      return []
    },

    handleFocusStart () {
      const elements = this.getFocusableElements()
      if (elements.length) {
        const index = this.alreadyFocused ? elements.length - 1 : 0
        this.alreadyFocused = true
        elements[index].focus()
      }
    },

    handleFocusEnd () {
      const elements = this.getFocusableElements()
      elements.length && elements[0].focus()
    }
  }
}
</script>
