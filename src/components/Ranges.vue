<template>
  <div class="ranges">
    <input
      type="range"
      min="0.1"
      max="1"
      value="volume"
      step="0.01"
      @change="setVolume(event.target.value)" />
    <input
      type="range"
      min="0.1"
      max="10"
      value="noteLength"
      step="0.01"
      @change="setNoteLength(event.target.value)" />
    <input
      type="range"
      min="0"
      max="7"
      value="octave"
      @change="setOctave(event.target.value)" />
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
