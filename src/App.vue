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
.commands {
    margin-top: 200px;
    width: 50%;
    float: left;
    /*background-color: black;*/
}
.commands .command-label {
    width: 100px;
    text-align: center;
    display: inline-block;
}
.commands .skeletons-container {
    display: block;
    position: absolute;
    top: 20px;
    left: 45px;
    background-color: black;
}
.commands .skeleton {
    width: 50px;
    padding-bottom: 0px;
    transition: padding 0.2s linear;
}
.commands .skeleton.active {
    padding-bottom: 20px;
    transition: padding 0.2s linear;
}
.commands .ranges {
    margin-top: 60px;
    margin-left: 10px;
}
.commands .tapes-container {
    margin-top: 175px;
    display: block;
}
.commands .panner {
    width: 300px;
    height: 30px;
    margin-top: 40px;
    background-color: #000;
    border: 2px solid #cfcfcf;
    cursor: e-resize;
    text-align: center;
    font-weight: bold;
}
.commands .panner.active {
    background-color: #2ecc71;
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
  margin: 3px;
}
.pad:hover {
  background: #229653;
  border-color: #1f8b4d;
}
.pad:active {
    background: #229653;
    border-color: #1f8b4d;
    border-bottom: #27ae60 1px solid;
    border-left: #27ae60 1px solid;
    border-right: #27ae60 1px solid;
    border-radius: 6px;
    margin-top: 9px;
    transition: all 0.2s ease;
}
.pad b {
    font-size: 11px;
}
.pad.active {
    background: #229653;
    border-color: #1f8b4d;
    border-bottom: #27ae60 1px solid;
    border-left: #27ae60 1px solid;
    border-right: #27ae60 1px solid;
    border-radius: 6px;
    margin-top: 9px;
    transition: all 0.2s ease;
}
.pad span {
    position: absolute;
    top: 30px;
    color: white;
}
.pad.condensed {
    height: 40px;
}
.pad.small {
    height: 40px;
    width: 50px;
}
.pad.small span {
    top: 25px;
    left: 30px;
}
.pad.small.current {
    animation: blink-animation 1s infinite;
}
#record.pad.active {
    animation: blink-animation 1s infinite;
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
.padset {
    float: right;
}
input[type=range] {
  -webkit-appearance: none;
  height: 150px;
  width: 95px;
  /*border-radius: 50px;*/
  outline: none;
  /*writing-mode: bt-lr;*/
  -webkit-appearance: slider-vertical;
}
</style>
