<template>
  <div class="padset">
    <br />

    <CommandPad
      :active="recording"
      text="RECORD"
      shortcut="spc"
      :on-mouse-down="toggleRecording" />
    <CommandPad
      v-if="playing"
      :active="playing"
      text="STOP"
      shortcut="enter"
      :on-mouse-down="togglePlayer" />
    <CommandPad
      v-else
      text="START"
      shortcut="enter"
      :on-mouse-down="togglePlayer" />
    <CommandPad
      text="CLEAR"
      shortcut="back"
      :on-mouse-down="clear" />

    <br /><br />

    <CommandPad
      :active="sineActive"
      text="Sine"
      shortcut="1"
      :on-mouse-down="setWave" />
    <CommandPad
      :active="squareActive"
      text="Square"
      shortcut="2"
      :on-mouse-down="setWave" />
    <CommandPad
      :active="triangleActive"
      text="Triangle"
      shortcut="3"
      :on-mouse-down="setWave" />
    <CommandPad
      :active="sawtoothActive"
      text="Sawtooth"
      shortcut="4"
      :on-mouse-down="setWave" />

    <br /><br /><br /><br /><br /><br /><br /><br />

    <Notes />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Notes from './Notes.vue';
import CommandPad from './CommandPad.vue';

export default {
  name: 'PadSet',
  components: {
    Notes, CommandPad,
  },
  computed: {
    ...mapGetters([
      'recording',
      'playing',
      'wave',
    ]),
    sineActive() {
      return this.wave === 'sine';
    },
    squareActive() {
      return this.wave === 'square';
    },
    triangleActive() {
      return this.wave === 'triangle';
    },
    sawtoothActive() {
      return this.wave === 'sawtooth';
    },
  },
  methods: {
    ...mapActions([
      'toggleRecording',
      'togglePlayer',
      'setWave',
      'clear',
    ]),
  },
};
</script>
