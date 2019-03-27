/* eslint no-param-reassign: 0 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
    octave: 4,
    noteLength: 1,
    volume: 0.1,
    wave: 'sine',
    timer: 0,
    ms: 10,
    tape: [
      { data: {}, active: true, current: true },
      { data: {}, active: false, current: false },
      { data: {}, active: false, current: false },
      { data: {}, active: false, current: false },
    ],
    tapeLength: 0,
    track: 0,
    recording: false,
    playing: false,
    timerInterval: null,
    playerInterval: null,
    panner: { x: 0, y: 0, z: 0 },
    activatePanner: false,
    keyDownListenerAttached: false,
    activeSkeleton: 3,
    activeNote: null,
    notesRow1: [
      { note: 'C', shortcut: 'q' },
      { note: 'C#', shortcut: 'w' },
      { note: 'D', shortcut: 'e' },
      { note: 'Eb', shortcut: 'r' },
    ],
    notesRow2: [
      { note: 'E', shortcut: 'a' },
      { note: 'F', shortcut: 's' },
      { note: 'F#', shortcut: 'd' },
      { note: 'G', shortcut: 'f' },
    ],
    notesRow3: [
      { note: 'G#', shortcut: 'z' },
      { note: 'A', shortcut: 'x' },
      { note: 'Bb', shortcut: 'c' },
      { note: 'B', shortcut: 'v' },
    ],
    notes: [
      {
        C: 16.35,
        'C#': 17.32,
        D: 18.35,
        Eb: 19.45,
        E: 20.6,
        F: 21.83,
        'F#': 23.12,
        G: 24.5,
        'G#': 25.96,
        A: 27.5,
        Bb: 29.14,
        B: 30.87,
      },
      {
        C: 32.7,
        'C#': 34.65,
        D: 36.71,
        Eb: 38.89,
        E: 41.2,
        F: 43.65,
        'F#': 46.25,
        G: 49,
        'G#': 51.91,
        A: 55,
        Bb: 58.27,
        B: 61.74,
      },
      {
        C: 65.41,
        'C#': 69.3,
        D: 73.42,
        Eb: 77.78,
        E: 82.41,
        F: 87.31,
        'F#': 92.5,
        G: 98,
        'G#': 103.8,
        A: 110,
        Bb: 116.5,
        B: 123.5,
      },
      {
        C: 130.8,
        'C#': 138.6,
        D: 146.8,
        Eb: 155.6,
        E: 164.8,
        F: 174.6,
        'F#': 185,
        G: 196,
        'G#': 207.7,
        A: 220,
        Bb: 233.1,
        B: 246.9,
      },
      {
        C: 261.6,
        'C#': 277.2,
        D: 293.7,
        Eb: 311.1,
        E: 329.6,
        F: 349.2,
        'F#': 370,
        G: 392,
        'G#': 415.3,
        A: 440,
        Bb: 466.2,
        B: 493.9,
      },
      {
        C: 523.3,
        'C#': 554.4,
        D: 587.3,
        Eb: 622.3,
        E: 659.3,
        F: 698.5,
        'F#': 740,
        G: 784,
        'G#': 830.6,
        A: 880,
        Bb: 932.3,
        B: 987.8,
      },
      {
        C: 1047,
        'C#': 1109,
        D: 1175,
        Eb: 1245,
        E: 1319,
        F: 1397,
        'F#': 1480,
        G: 1568,
        'G#': 1661,
        A: 1760,
        Bb: 1865,
        B: 1976,
      },
      {
        C: 2093,
        'C#': 2217,
        D: 2349,
        Eb: 2489,
        E: 2637,
        F: 2794,
        'F#': 2960,
        G: 3136,
        'G#': 3322,
        A: 3520,
        Bb: 3729,
        B: 3951,
      },
      {
        C: 4186,
        'C#': 4435,
        D: 4699,
        Eb: 4978,
        E: 5274,
        F: 5588,
        'F#': 5920,
        G: 6272,
        'G#': 6645,
        A: 7040,
        Bb: 7459,
        B: 7902,
      },
    ],
  },
  mutations: {
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
    pushCurrentSoundToRecorder(state, {trackNumber, timer, sound}) {
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
    activateNote(state, note) {
      state.activeNote = note;
    },
    deactivateNote(state) {
      state.activeNote = null;
    },
  },
  actions: {
    setOctave({ commit }, value) {
      commit('setOctave', value);
    },
    setNoteLength({ commit }, value) {
      commit('setNoteLength', value);
    },
    setVolume({ commit }, value) {
      commit('setVolume', value);
    },
    setWave({ commit }, value) {
      commit('setWave', value);
    },
    setTrack({ commit, state }, trackNumber) {
      if (!state.recording) {
        commit('setTrack', trackNumber);
        commit('setCurrentTape', trackNumber);

        if (state.tape[trackNumber].current && !state.tape[trackNumber].active) {
          commit('setActiveTape', { trackNumber, active: true });
        } else if (state.tape[trackNumber].current && state.tape[trackNumber].active) {
          commit('setActiveTape', { trackNumber, active: false });
        }
      }
    },
    setPanner({ commit, state }, event) {
      if (state.activatePanner) {
        commit('resetPanner');
        commit('setPanner', event.clientX);
      }
    },
    togglePanner({ commit, state }) {
      if (state.activatePanner) {
        commit('resetPanner');
        commit('togglePanner', false);
      } else {
        commit('togglePanner', true);
      }
    },
    beep({ commit, state }, sounds) {
      sounds.forEach((sound) => {
        const o = state.audioCtx.createOscillator();
        const g = state.audioCtx.createGain();
        const { length } = sound;

        if (sound.frequency) {
          o.type = sound.wave;

          g.gain.value = sound.volume;
          g.gain.exponentialRampToValueAtTime(0.001, state.audioCtx.currentTime + length);

          const panner = state.audioCtx.createPanner();
          panner.setPosition(state.panner.x, 0, 1);

          o.frequency.value = sound.frequency;
          o.connect(panner);
          panner.connect(g);
          g.connect(state.audioCtx.destination);
          o.start(state.audioCtx.currentTime);
          o.stop(state.audioCtx.currentTime + length);
        }
      });
      commit('animateSkeletons');
    },
    playSound({ commit, dispatch, state }, note) {
      const { octave } = state;
      const frequency = state.notes[octave][note];
      const sound = {
        frequency,
        wave: state.wave,
        length: state.noteLength,
        volume: state.volume,
      };

      dispatch('beep', [sound]);

      if (state.recording) {
        const isAnySavedSound = state.tape.some(tape => Object.keys(tape.data).length > 0);

        if (!isAnySavedSound) {
          commit('resetTimer');
        }

        commit('pushCurrentSoundToRecorder', {trackNumber: state.track, timer: state.timer, sound});
      }
    },
    animateSkeletons({ commit }) {
      commit('animateSkeletons');
    },
    startPlayer({ commit }) {
      commit('togglePlayer', true);

      commit('setPlayerInterval', () => {
        commit('setTimer', 0);
      });
    },
    togglePlayer({ commit, dispatch, state }) {
      if (!state.recording) {
        if (!state.playing && Object.keys(state.tape[state.track].data).length) {
          dispatch('startPlayer');

          commit('setTimerInterval', () => {
            commit('setTimer', state.timer + state.ms);
            state.tape.forEach((tape) => {
              if (tape.active) {
                if (tape.data[state.timer]) {
                  dispatch('beep', tape.data[state.timer]);
                }
              }
            });
          });
        } else {
          commit('clearIntervalName', 'playerInterval');
          commit('clearIntervalName', 'timerInterval');
          commit('togglePlayer', false);
          commit('setTimer', 0);
        }
      }
    },
    toggleRecording({ commit, dispatch, state }) {
      if (!state.recording) {
        commit('toggleRecording', true);

        if (!state.tape.some(tape => tape.active)) {
          commit('setActiveTape', { trackNumber: 0, active: true });
          commit('setCurrentTape', 0);
        }

        if (!state.playing) {
          commit('setTimerInterval', () => { state.timer += state.ms; });
        }
      } else {
        commit('toggleRecording', false);

        if (!state.tapeLength) {
          commit('setTapeLength', state.timer);
        }

        if (!state.playing) {
          commit('setTapeLength', state.timer);
          commit('clearIntervalName', 'timerInterval');
          commit('setTimer', 0);
          dispatch('togglePlayer');
        }
      }
    },
    clear({ commit, state }) {
      commit('clearTrackData', state.track);
      const hasData = state.tape.some(tape => Object.keys(tape.data).length > 0);
      if (!hasData) {
        commit('setTapeLength', 0);
        commit('setTimer', 0);
        commit('togglePlayer', false);
        commit('toggleRecording', false);
        commit('clearIntervalName', 'playerInterval');
        commit('clearIntervalName', 'timerInterval');
      }
    },
    animatePad({ commit }, note) {
      commit('activateNote', note);
      setTimeout(() => {
        commit('deactivateNote', note);
      }, 150);
    },
    onKeyDown({ commit, dispatch, state }, event) {
      switch (event.keyCode) {
        case 90:
          dispatch('playSound', 'G#');
          dispatch('animatePad', 'G#');
          break;
        case 88:
          dispatch('playSound', 'A');
          dispatch('animatePad', 'A');
          break;
        case 67:
          dispatch('playSound', 'Bb');
          dispatch('animatePad', 'Bb');
          break;
        case 86:
          dispatch('playSound', 'B');
          dispatch('animatePad', 'B');
          break;
        case 65:
          dispatch('playSound', 'E');
          dispatch('animatePad', 'E');
          break;
        case 83:
          dispatch('playSound', 'F');
          dispatch('animatePad', 'F');
          break;
        case 68:
          dispatch('playSound', 'F#');
          dispatch('animatePad', 'F#');
          break;
        case 70:
          dispatch('playSound', 'G');
          dispatch('animatePad', 'G');
          break;
        case 81:
          dispatch('playSound', 'C');
          dispatch('animatePad', 'C');
          break;
        case 87:
          dispatch('playSound', 'C#');
          dispatch('animatePad', 'C#');
          break;
        case 69:
          dispatch('playSound', 'D');
          dispatch('animatePad', 'D');
          break;
        case 82:
          dispatch('playSound', 'Eb');
          dispatch('animatePad', 'Eb');
          break;
        case 32:
          dispatch('toggleRecording', !state.recording);
          break;
        case 49:
          commit('setWave', 'sine');
          break;
        case 50:
          commit('setWave', 'square');
          break;
        case 51:
          commit('setWave', 'triangle');
          break;
        case 52:
          commit('setWave', 'sawtooth');
          break;
        case 8:
          dispatch('clear');
          break;
        case 13:
          dispatch('togglePlayer');
          break;
        default:
          break;
      }
    },
    registerOnKeyDownListener({ commit, dispatch, state }) {
      if (!state.keyDownListenerAttached) {
        commit('setKeyDownListenerAttached');
        window.addEventListener('keydown', event => dispatch('onKeyDown', event));
      }
    },
  },
  getters: {
    activeSkeleton(state) {
      return state.activeSkeleton;
    },
    activeNote(state) {
      return state.activeNote;
    },
    notesRow1(state) {
      return state.notesRow1;
    },
    notesRow2(state) {
      return state.notesRow2;
    },
    notesRow3(state) {
      return state.notesRow3;
    },
    playing(state) {
      return state.playing;
    },
    recording(state) {
      return state.recording;
    },
    wave(state) {
      return state.wave;
    },
    activatePanner(state) {
      return state.activatePanner;
    },
    volume(state) {
      return state.volume;
    },
    noteLength(state) {
      return state.noteLength;
    },
    octave(state) {
      return state.octave;
    },
    tape(state) {
      return state.tape;
    },
  },
});
