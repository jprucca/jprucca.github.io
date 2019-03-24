<template>
  <span
    :class="classes"
    @mousedown="handleMouseDown"
  >
    <span>{{ text }} <b>[{{ shortcut }}]</b></span>
  </span>
</template>

<script>
export default {
  name: 'CommandPad',
  props: {
    active: Boolean,
    onMouseDown: Function,
    text: String,
    shortcut: String,
  },
  computed: {
    classes() {
      return `record pad condensed ${this.active ? 'active' : ''}`;
    },
  },
  methods: {
    handleMouseDown() {
      this.onMouseDown(this.text.toLowerCase());
    },
  },
};
</script>
