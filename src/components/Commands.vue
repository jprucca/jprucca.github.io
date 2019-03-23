<template>
  <div class="commands">
    <Skeletons :active="activeSkeleton" />
    <Ranges />
    <!-- <Panner /> -->
    <Tapes />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters([
      'activeSkeleton',
    ]),
  },
};
</script>
