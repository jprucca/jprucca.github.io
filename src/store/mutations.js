export default {
  setOctave(state, value) {
    state.octave = value;
  },
  setNoteLength(state, value) {
    state.noteLength = parseFloat(value);
  },
  setVolume(state, value) {
    state.volume = parseFloat(value);
  },
  setWave(state, value) {
    state.wave = value;
  },
  setTrack(state, trackNumber) {
    state.track = parseInt(trackNumber, 10);
  },
  setCurrentTape(state, trackNumber) {
    const tapes = state.tape.map(tape => ({ ...tape, current: false }));
    tapes[trackNumber].current = true;
    state.tape = tapes;
  },
  setActiveTape(state, { trackNumber, active }) {
    state.tape[trackNumber].active = active;
  },
  setPanner(state, clientX) {
    state.panner = { x: (clientX - 150) / 10, y: 0, z: 0 };
  },
  resetPanner(state) {
    state.panner = { x: 0, y: 0, z: 0 };
  },
  togglePanner(state, active) {
    state.activatePanner = active;
  },
  resetTimer(state) {
    state.timer = 10;
  },
  setTimer(state, timer) {
    state.timer = timer;
  },
  pushCurrentSoundToRecorder(state, { trackNumber, timer, sound }) {
    if (state.tape[trackNumber].data[timer]) {
      state.tape[trackNumber].data[timer].push(sound);
    } else {
      state.tape[trackNumber].data[timer] = [];
      state.tape[trackNumber].data[timer].push(sound);
    }
  },
  animateSkeletons(state) {
    const min = 1;
    const max = 5;
    state.activeSkeleton = state.activeSkeleton === max ? min : state.activeSkeleton + 1;
  },
  togglePlayer(state, active) {
    state.playing = active;
  },
  setPlayerInterval(state, interval) {
    state.playerInterval = setInterval(interval, state.tapeLength);
  },
  setTimerInterval(state, interval) {
    state.timerInterval = setInterval(interval, state.ms);
  },
  clearIntervalName(state, intervalName) {
    clearInterval(state[intervalName]);
  },
  toggleRecording(state, active) {
    state.recording = active;
  },
  setTapeLength(state, tapeLength) {
    state.tapeLength = tapeLength;
  },
  clearTrackData(state, trackNumber) {
    state.tape[trackNumber].data = {};
  },
  setKeyDownListenerAttached(state) {
    state.keyDownListenerAttached = true;
  },
  registerOnKeyDownListener(state) {
    if (!state.keyDownListenerAttached) {
      state.keyDownListenerAttached = true;
      window.addEventListener('keydown', state.onKeyDown.bind(state));
    }
  },
  registerAudioContext(state) {
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  },
  activateNote(state, note) {
    state.activeNote = note;
  },
  deactivateNote(state) {
    state.activeNote = null;
  },
};
