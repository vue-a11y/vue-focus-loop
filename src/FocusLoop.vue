<template>
  <div class="vue-focus-loop">
    <div
      :tabindex="getTabindex"
      @focus="handleFocusStart"
    />
    <div ref="focusLoopRef">
      <slot />
    </div>
    <div
      :tabindex="getTabindex"
      @focus="handleFocusEnd"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, watch, onMounted } from 'vue'

const focusableElementsSelector = [
  ...['input', 'select', 'button', 'textarea'].map(field => `${field}:not([disabled])`),
  'a[href]',
  'video[controls]',
  'audio[controls]',
  '[tabindex]:not([tabindex^="-"])',
  '[contenteditable]:not([contenteditable="false"])'
].join(',')

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
    const focusLoopRef = ref<InstanceType<any>>(null)
    const alreadyFocused = ref(false)
    const getTabindex = computed((): number => props.disabled ? -1 : 0)
    watch(() => props.isVisible, focusFirst)

    onMounted(() => focusFirst(props.isVisible))

    function focusFirst (visible: boolean): void {
      if (visible && props.autoFocus) {
        const elements = getFocusableElements()
        if (elements.length) setTimeout(() => elements[0].focus(), 200)        
      }
    }

    function getFocusableElements (): HTMLElement[] {
      const focusableElements = focusLoopRef.value.querySelectorAll(focusableElementsSelector)
      if (focusableElements && focusableElements.length) return focusableElements
      return []
    }

    function handleFocusStart (): void {
      const elements: HTMLElement[] = getFocusableElements()
      if (elements.length) {
        const index = alreadyFocused.value ? elements.length - 1 : 0
        alreadyFocused.value = true
        elements[index].focus()
      }
    }

    function handleFocusEnd (): void {
      const elements: HTMLElement[] = getFocusableElements()
      elements.length && elements[0].focus()
    }

    return {
      focusLoopRef,
      getTabindex,
      handleFocusEnd,
      handleFocusStart
    }
  }
})
</script>
