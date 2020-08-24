<template>
  <div class="vue-focus-loop">
    <div
      :tabindex="getTabindex"
      @focus="handleFocusStart"
    />
    <div ref="focusLoop">
      <slot />
    </div>
    <div
      :tabindex="getTabindex"
      @focus="handleFocusEnd"
    />
  </div>
</template>

<script>
const focusableElementsSelector = [
  ...['input', 'select', 'button', 'textarea'].map(field => `${field}:not([disabled])`),
  'a[href]',
  'video[controls]',
  'audio[controls]',
  '[tabindex]:not([tabindex^="-"])',
  '[contenteditable]:not([contenteditable="false"])'
].join(',')

export default {
  name: 'FocusLoop',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isVisible: {
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

  watch: {
    isVisible: 'focusFirst'
  },

  mounted () {
    this.focusFirst(this.isVisible || true)
  },

  methods: {
    getFocusableElements () {
      const focusableElements = this.$refs.focusLoop.querySelectorAll(focusableElementsSelector)
      if (focusableElements && focusableElements.length) return focusableElements
      return []
    },

    focusFirst (visible) {
      if (!visible) return
      const elements = this.getFocusableElements()
      if (elements.length) setTimeout(() => elements[0].focus(), 200)
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
