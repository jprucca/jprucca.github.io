<template>
  <div :class="classes" @click="togglePanner()" @mousemove="setPanner(event)">
    Panner
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Panner',
  computed: {
    ...mapState([
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

<style lang="less" scoped>
.panner {
  width: 300px;
  height: 30px;
  margin-top: 40px;
  background-color: #000;
  border: 2px solid #cfcfcf;
  cursor: e-resize;
  text-align: center;
  font-weight: bold;
}
.panner.active {
  background-color: #2ecc71;
}
</style>

