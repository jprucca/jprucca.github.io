<template>
  <div>
    <Commands />
    <PadSet />
  </div>
</template>

<script>
import Commands from './Commands.vue';
import PadSet from './PadSet.vue';

export default {
  name: 'Root',
  components: {
    Commands,
    PadSet,
  },
};
</script>
