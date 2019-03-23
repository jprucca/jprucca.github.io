<template>
  <span :class="classes" @click="onClick(track)">
    <span>{{ track }}</span>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Tapes',
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
      return `pad small ${this.getTrackClasses()}`;
    },
  },
  methods: {
    ...mapActions([
      'setTrack',
    ]),
    getTrackClasses() {
      let className = '';
      if (this.props.active) {
        className += ' active';
        if (this.props.current) {
          className += ' current';
        }
      }
      return className;
    },
  },
};
</script>
