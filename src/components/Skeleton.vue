<template>
  <img src="../assets/skeleton.png" :class="classes" />
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    active: Number,
    order: Number,
  },
  computed: {
    classes() {
      return `skeleton ${this.active === this.order ? 'active' : ''}`;
    },
  },
};
</script>
