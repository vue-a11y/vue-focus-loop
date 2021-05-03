<template>
  <div
    v-if="isVisible"
    ref="focusLoopContainerRef"
    class="vue-focus-loop"
  >
    <div
      :tabindex="getTabindex"
      aria-hidden="true"
      @focus="handleFocusStart"
    />
    <div ref="focusLoopContentRef">
      <slot />
    </div>
    <div
      :tabindex="getTabindex"
      aria-hidden="true"
      @focus="handleFocusEnd"
    />
  </div>
</template>

<script lang="ts">
import { ref, nextTick, defineComponent, computed, watch, onMounted, onUnmounted } from 'vue'

const focusableElementsSelector = [
  ...['input', 'select', 'button', 'textarea'].map(field => `${field}:not([disabled])`),
  'a[href]',
  'video[controls]',
  'audio[controls]',
  '[tabindex]:not([tabindex^="-"])',
  '[contenteditable]:not([contenteditable="false"])'
].join(',')

let ariaHiddenElements: Element[] = []

export default defineComponent({
  name: 'FocusLoop',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    autoFocus: {
      type: Boolean,
      default: true
    }
  },

  setup (props) {
    const focusLoopContainerRef = ref<InstanceType<any>>(null)
    const focusLoopContentRef = ref<InstanceType<any>>(null)
    const alreadyFocused = ref(false)
    const getTabindex = computed((): number => props.disabled ? -1 : 0)
    
    watch([() => props.disabled, () => props.isVisible], init)

    onMounted(init)

    function init () {
      nextTick(() => {
        const active = props.isVisible && !props.disabled
        !props.disabled && focusFirst(active && props.autoFocus)
        managePrevFocusElement(active)
        lockForSwipeScreenReader(active)
        if (!active) {
          ariaHiddenElements = []
        }
      })
    }

    function managePrevFocusElement (active: boolean) {
      if (!active && window.vflPrevFocusedElement) {
        return window.vflPrevFocusedElement.focus()
      }
      window.vflPrevFocusedElement = document.activeElement
    }

    function getElementsToAriaHidden (focusLoopContainer: HTMLElement) {
      function getElements (element: Element) {
        const children: Element[] = Array.from(element.children)
        children.forEach((el: Element) => {
          if (el === focusLoopContainer) return
          if (!el.contains(focusLoopContainer)) {
            ariaHiddenElements.push(el)
            return
          }
          getElements(el)
        })
      }
      getElements(document.body)
    }

    function lockForSwipeScreenReader (active: boolean = true) {
      if (active) getElementsToAriaHidden(focusLoopContainerRef.value)
      ariaHiddenElements.forEach(el => {
        if (['SCRIPT', 'STYLE'].includes(el.nodeName) || el.hasAttribute('aria-live')) return
        el.setAttribute('aria-hidden', active.toString())
      })
    }

    function focusFirst (isAutoFocus: boolean) {
      if (isAutoFocus) {
        const elements = getFocusableElements()
        if (elements.length) setTimeout(() => elements[0].focus(), 200)        
      }
    }

    function getFocusableElements (): HTMLElement[] {
      const focusableElements = focusLoopContentRef.value.querySelectorAll(focusableElementsSelector)
      if (focusableElements && focusableElements.length) return focusableElements
      return []
    }

    function handleFocusStart () {
      const elements: HTMLElement[] = getFocusableElements()
      if (elements.length) {
        const index = alreadyFocused.value ? elements.length - 1 : 0
        alreadyFocused.value = true
        elements[index].focus()
      }
    }

    function handleFocusEnd () {
      const elements: HTMLElement[] = getFocusableElements()
      elements.length && elements[0].focus()
    }

    return {
      getTabindex,
      handleFocusEnd,
      handleFocusStart,
      focusLoopContentRef,
      focusLoopContainerRef
    }
  }
})
</script>

<style></style>
