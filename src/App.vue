<template>
  <Root />
</template>

<script>
import Root from './components/Root.vue';

export default {
  name: 'App',
  components: {
    Root,
  },
  created() {
    this.$store.dispatch('registerOnKeyDownListener');
    this.$store.dispatch('registerAudioContext');
  },
};
</script>

<style lang="less">
body {
    background-color: black;
    font-family: monospace;
    color: white;
    min-width: 1024px;
    background-image: url('./assets/background.png');
    background-repeat: no-repeat;
    background-position: bottom;
    background-origin: padding-box;
    background-size: contain;
    height: 800px;
    overflow-y: hidden;
}
::selection {
  background: none; /* WebKit/Blink Browsers */
}
::-moz-selection {
  background: none; /* Gecko Browsers */
}

.pad {
  width: 95px;
  height: 95px;
  background: #2ecc71;
  border-bottom: #27ae60 10px solid;
  border-left: #27ae60 1px solid;
  border-right: #27ae60 1px solid;
  /*border-top: #27ae60 5px solid;*/
  border-radius: 6px;
  padding: 10px;
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 15px;
  position: relative;
  margin: 0px 3px;

  &:hover {
    background: #229653;
    border-color: #1f8b4d;
  }
  &:active {
    background: #229653;
    border-color: #1f8b4d;
    border-bottom: #27ae60 1px solid;
    border-left: #27ae60 1px solid;
    border-right: #27ae60 1px solid;
    border-radius: 6px;
    margin-top: 9px;
    transition: all 0.2s ease;
  }
  b {
    font-size: 11px;
  }
  &.active {
    background: #229653;
    border-color: #1f8b4d;
    border-bottom: #27ae60 1px solid;
    border-left: #27ae60 1px solid;
    border-right: #27ae60 1px solid;
    border-radius: 6px;
    margin-top: 9px;
    transition: all 0.2s ease;
  }
  span {
    position: absolute;
    top: 30px;
    color: white;
  }
  &.condensed {
    height: 40px;
  }
  &.small {
    height: 40px;
    width: 50px;
  }
  &.small span {
    top: 25px;
    left: 30px;
  }
  &.small.current {
    animation: blink-animation 1s infinite;
  }
  &.record.active {
    animation: blink-animation 1s infinite;
  }
}

@keyframes blink-animation {
  0% {
    background-color: red;
    border-color: rgb(194, 3, 3);
  }
  100% {
    background: #229653;
    border-color: #1f8b4d;
  }
}
</style>
