<template>
  <span :class="classes" @click="onClick(tapeNumber)">
    <span>{{ tapeNumber + 1}}</span>
  </span>
</template>

<script>
export default {
  name: 'TapeButton',
  props: {
    active: Boolean,
    current: Boolean,
    onClick: Function,
    tapeNumber: Number,
  },
  computed: {
    classes() {
      return `pad record small ${this.getTrackClasses()}`;
    },
  },
  methods: {
    getTrackClasses() {
      let className = '';
      if (this.active) {
        className += ' active';
        if (this.current) {
          className += ' current';
        }
      }
      return className;
    },
  },
};
</script>
