<template>
  <div class="tapes-container">
      <TrackButton
        v-for="n in 4"
        active="recorderStore.tape[n - 1].active"
        current="recorderStore.tape[n - 1].current"
        track="n"
        :key="n"
        on-click="setTrack" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TrackButton from './TrackButton.vue';

export default {
  name: 'Tapes',
  components: {
    TrackButton,
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
