# [@vue-a11y/focus-loop](https://focus-loop.vue-a11y.com)

Vue 3 component that helps you to to trap focus in an element.

---

When developing accessible components, in certain behaviors it is important to trap focus on the element.

For example, when opening a modal, it is recommended that the focus is only on the tabbable elements of that modal and only release the focus, when the modal is closed.

## Installation

Add `@vue-a11y/focus-loop` for Vue 3 in your Vue project.

```sh
npm install -S @vue-a11y/focus-loop@next
# or
yarn add @vue-a11y/focus-loop@next
```

Or via CDN

```html
<script src="http://unpkg.com/@vue-a11y/focus-loop@next"></script>
```

## Usage

You can use it globally in your main.js.

```js
import Vue from 'vue'
import VueFocusLoop from '@vue-a11y/focus-loop'

Vue.use(VueFocusLoop)
```

Or you can import into your component.

```js
import { FocusLoop } from '@vue-a11y/focus-loop'

export default {
  components: {
    FocusLoop
  }
}
```

**Example** of use on your single file component.

```vue
<template>
  <div>
    <b-button v-b-modal.modal-1>Launch demo modal</b-button>

    <b-modal id="modal-1" title="BootstrapVue">
      <FocusLoop>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-2" label="Your Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Your Email:" label-for="input-2">
            <b-form-input
              id="input-2"
              type="email"
              v-model="form.email"
              required
              placeholder="Enter email" 
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </FocusLoop>
    </b-modal>
  </div>
</template>
```

## Disable loop

You can disable the focus trap and activate it only when you really need it.

prop       | type      | default
---------- | --------- | ------------
disabled   | `Boolean` | `false`

For example:

```html

<FocusLoop disabled>
  <!-- your elements here -->
</FocusLoop>

```

## Focus in first element

There are 2 ways in which `<FocusLoop>` sets the focus on the first element.

Using `v-if`, for example `<FocusLoop v-if="isSidebarOpen">`, the first element is automatically focused when `mounted`.

If you have `<FocusLoop>` mounted, but hidden using CSS, you can set the focus on the first element when visible.

prop        | type      | default
----------- | --------- | ------------
isVisible   | `Boolean` | `false`

For example:

```html
<FocusLoop :isVisible="isSidebarOpen">
  <!-- your elements here -->
</FocusLoop>
```

## Keyboard support

Keyboard users will use `Tab` and `Shift + Tab` to navigate tabbable elements.  

According to the Modal Dialog Example in WAI-ARIA Authoring Practices specification, when the focus is on the last focusable element, you must move the focus to the first element and vice versa.

Key          | Function
------------ | ------------
Tab          | ▸ Moves focus to next focusable element inside the dialog.  <br> ▸ When focus is on the last focusable element in the dialog, moves focus to the first focusable element in the dialog.
Shift + Tab  | ▸ Moves focus to previous focusable element inside the dialog.  <br> ▸ When focus is on the first focusable element in the dialog, moves focus to the last focusable element in the dialog.

## Links
- [Demo](https://vue-focus-loop.surge.sh)

## Articles that served as inspiration:
- [Using JavaScript to trap focus in an element](https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element)

## Other options
- [focus-trap](https://github.com/davidtheclark/focus-trap)
- [vue-focus-lock](https://github.com/theKashey/vue-focus-lock)

## Contributing
- From typos in documentation to coding new features;
- Check the open issues or open a new issue to start a discussion around your feature idea or the bug you found;
- Fork repository, make changes and send a pull request;

Follow us on Twitter [@vue_a11y](https://twitter.com/vue_a11y)

**Thank you**