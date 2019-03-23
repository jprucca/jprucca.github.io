<template>
  <div class="skeletons-container">
    <Skeleton v-for="n in 5" :active="active" :order="n" :key="n" />
  </div>
</template>

<script>
import Skeleton from './Skeleton.vue';

export default {
  name: 'Skeletons',
  components: {
    Skeleton,
  },
  props: {
    active: Number,
  },
};
</script>
