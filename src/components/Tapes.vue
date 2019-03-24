<template>
  <div class="tapes-container">
      <TapeButton
        v-for="n in 4"
        :active="tape[n-1].active"
        :current="tape[n-1].current"
        :track="n"
        :key="n"
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
