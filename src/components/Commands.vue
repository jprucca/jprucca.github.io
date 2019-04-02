<template>
  <div class="commands">
    <Skeletons :active="activeSkeleton" />
    <Ranges />
    <!-- <Panner /> -->
    <Tapes />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Skeletons from './Skeletons.vue';
import Ranges from './Ranges.vue';
import Tapes from './Tapes.vue';

export default {
  name: 'Commands',
  components: {
    Skeletons,
    Ranges,
    Tapes,
  },
  computed: {
    ...mapState([
      'activeSkeleton',
    ]),
  },
};
</script>

<style lang="less" scoped>
.commands {
  margin-top: 200px;
  width: 50%;
  float: left;
  /*background-color: black;*/
}
</style>
