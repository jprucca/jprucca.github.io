<template>
  <span :class="classes" @click="onClick(track - 1)">
    <span>{{ track }}</span>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TapeButton',
  props: {
    active: Boolean,
    current: Boolean,
    onClick: Function,
    track: Number,
  },
  computed: {
    ...mapGetters([
      'tape',
    ]),
    classes() {
      return `pad record small ${this.getTrackClasses()}`;
    },
  },
  methods: {
    ...mapActions([
      'setTrack',
    ]),
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
