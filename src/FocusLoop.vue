<template>
  <div
    v-if="isVisible"
    ref="VuefocusLoopContainer"
    class="vue-focus-loop"
  >
    <div
      :tabindex="getTabindex"
      aria-hidden="true"
      @focus="handleFocusStart"
    />
    <div ref="focusLoop">
      <slot />
    </div>
    <div
      :tabindex="getTabindex"
      aria-hidden="true"
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

let ariaHiddenElements = []

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
    },
    autoFocus: {
      type: Boolean,
      default: true
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
    isVisible: 'init',
    disabled: 'init'
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.$nextTick(() => {
        const active = this.isVisible && !this.disabled
        !this.disabled && this.focusFirst(active && this.autoFocus)
        this.managePrevFocusElement(active)
        this.lockForSwipeScreenReader(active)
        if (!active) {
          ariaHiddenElements = []
        }
      })
    },

    managePrevFocusElement (active) {
      if (!active && window.vflPrevFocusedElement) {
        return window.vflPrevFocusedElement.focus()
      }
      window.vflPrevFocusedElement = document.activeElement
    },

    getElementsToAriaHidden (focusLoopContainer) {
      function getElements (element) {
        const children = Array.from(element.children)
        children.forEach(el => {
          if (el === focusLoopContainer) return
          if (!el.contains(focusLoopContainer)) {
            ariaHiddenElements.push(el)
            return
          }
          getElements(el)
        })
      }
      getElements(document.body)
    },

    lockForSwipeScreenReader (active = true) {
      if (active) this.getElementsToAriaHidden(this.$refs.VuefocusLoopContainer)
      ariaHiddenElements.forEach(el => {
        if (['SCRIPT', 'STYLE'].includes(el.nodeName) || el.hasAttribute('aria-live')) return
        el.setAttribute('aria-hidden', active.toString())
      })
    },

    focusFirst (isAutoFocus) {
      if (isAutoFocus) {
        const elements = this.getFocusableElements()
        if (elements.length) setTimeout(() => elements[0].focus(), 200)
      }
    },

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
