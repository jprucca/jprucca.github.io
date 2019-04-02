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

<style lang="less" scoped>
.skeleton {
  width: 50px;
  padding-bottom: 0px;
  transition: padding 0.2s linear;

  &.active {
    padding-bottom: 20px;
    transition: padding 0.2s linear;
  }
}
</style>
