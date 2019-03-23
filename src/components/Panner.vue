<template>
  <div :class="classes" @click="togglePanner()" @mousemove="setPanner(event)">
    Panner
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Panner',
  computed: {
    ...mapGetters([
      'activatePanner',
    ]),
    classes() {
      return `panner ${this.activatePanner ? 'active' : ''}`;
    },
  },
  methods: {
    ...mapActions([
      'togglePanner',
      'setPanner',
    ]),
  },
};
</script>
