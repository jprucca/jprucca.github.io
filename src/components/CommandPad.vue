<template>
  <span
    :class="classes"
    id="record"
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
      return `pad condensed ${this.active ? 'active' : ''}`;
    },
  },
  methods: {
    handleMouseDown() {
      this.onMouseDown();
    },
  },
};
</script>
