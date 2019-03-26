<template>
  <div class="tapes-container">
    <TapeButton
      v-for="(item, index) in tape"
      :active="item.active"
      :current="item.current"
      :tapeNumber="index"
      :key="index"
      :on-click="setTrack" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TapeButton from './TapeButton.vue';

export default {
  name: 'Tapes',
  components: {
    TapeButton,
  },
  computed: {
    ...mapGetters([
      'tape',
    ]),
  },
  methods: {
    ...mapActions([
      'setTrack',
    ]),
  },
};
</script>
