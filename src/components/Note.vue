<template>
  <span
    :class="classes"
    @mousedown="handleMouseDown"
  >
    <span>{{ note }} <b>[{{ shortcut }}]</b></span>
  </span>
</template>

<script>
export default {
  name: 'Note',
  props: {
    note: String,
    onMouseDown: Function,
    shortcut: String,
    activeNote: String,
  },
  computed: {
    classes() {
      return `pad condensed ${this.props.activeNote === this.props.note ? 'active' : ''}`;
    },
  },
  methods: {
    handleMouseDown() {
      this.props.onMouseDown(this.props.note);
    },
  },
};
</script>
