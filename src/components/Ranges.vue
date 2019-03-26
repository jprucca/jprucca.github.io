<template>
  <div class="ranges">
    <input
      type="range"
      min="0.1"
      max="1"
      value="volume"
      step="0.01"
      v-model="volumeModel"
      @change="setVolume(volumeModel)" />
    <input
      type="range"
      min="0.1"
      max="10"
      value="noteLength"
      step="0.01"
      v-model="noteLengthModel"
      @change="setNoteLength(noteLengthModel)" />
    <input
      type="range"
      min="0"
      max="7"
      value="octave"
      v-model="octaveModel"
      @change="setOctave(octaveModel)" />
    <div>
      <div class="command-label">
        Volume
        </div>
      <div class="command-label">
        Length
        </div>
      <div class="command-label">
        Octave
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Ranges',
  data() {
    return {
      volumeModel: 0.1,
      noteLengthModel: 1,
      octaveModel: 4,
    };
  },
  computed: {
    ...mapGetters([
      'volume',
      'noteLength',
      'octave',
    ]),
  },
  methods: {
    ...mapActions([
      'setVolume',
      'setNoteLength',
      'setOctave',
    ]),
  },
};
</script>
