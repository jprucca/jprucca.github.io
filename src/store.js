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
      if (!state.recording) {
        state.track = parseInt(trackNumber, 10);

        state.tape.forEach((tape) => { tape.current = false; });

        state.tape[state.track].current = !state.tape[state.track].current;

        if (state.tape[state.track].current && !state.tape[state.track].active) {
          state.tape[state.track].active = true;
        } else if (state.tape[state.track].current && state.tape[state.track].active) {
          state.tape[state.track].active = false;
        }
      }
    },
    setPanner(state, event) {
      if (state.activatePanner) {
        state.panner = { x: (event.clientX - 150) / 10, y: 0, z: 0 };
      }
    },
    togglePanner(state) {
      if (state.activatePanner) {
        state.panner = { x: 0, y: 0, z: 0 };
        state.activatePanner = false;
      } else {
        state.activatePanner = true;
      }
    },
    playSound(state, note) {
      const { octave } = state;
      const frequency = state.notes[octave][note];
      const sound = {
        frequency,
        wave: state.wave,
        length: state.noteLength,
        volume: state.volume,
      };

      state.beep([sound]);

      if (state.recording) {
        const isAnySavedSound = state.tape.some(tape => Object.keys(tape.data).length > 0);

        if (!isAnySavedSound) {
          state.timer = 10;
        }
        if (state.tape[state.track].data[state.timer]) {
          state.tape[state.track].data[state.timer].push(sound);
        } else {
          state.tape[state.track].data[state.timer] = [];
          state.tape[state.track].data[state.timer].push(sound);
        }
      }
    },
    beep(state, sounds) {
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

      state.animateSkeletons();
    },
    animateSkeletons(state) {
      const min = 1;
      const max = 5;
      state.activeSkeleton = state.activeSkeleton === max ? min : state.activeSkeleton + 1;
    },
    togglePlayer(state) {
      if (!state.recording) {
        if (!state.playing && Object.keys(state.tape[state.track].data).length) {
          state.playing = true;

          state.playerInterval = setInterval(() => {
            state.timer = 0;
          }, state.tapeLength);

          state.timerInterval = setInterval(() => {
            state.timer += state.ms;
            state.tape.forEach((tape) => {
              if (tape.active) {
                if (tape.data[state.timer]) {
                  state.beep(tape.data[state.timer]);
                }
              }
            });
          }, state.ms);
        } else {
          clearInterval(state.playerInterval);
          clearInterval(state.timerInterval);
          state.playing = false;
          state.timer = 0;
        }
      }
    },
    toggleRecording(state) {
      if (!state.recording) {
        state.recording = true;

        if (!state.tape.some(tape => tape.active)) {
          state.tape[0].active = true;
          state.tape[0].current = true;
        }

        if (!state.playing) {
          state.timerInterval = setInterval(() => { state.timer += state.ms; }, state.ms);
        }
      } else {
        state.recording = false;

        if (!state.tapeLength) {
          state.tapeLength = state.timer;
        }

        if (!state.playing) {
          clearInterval(state.timerInterval);
          state.tapeLength = state.timer;
          state.timer = 0;
          state.togglePlayer();
        }
      }
    },
    clear(state) {
      state.tape[state.track].data = {};
      const hasData = state.tape.some(tape => Object.keys(tape.data).length > 0);
      if (!hasData) {
        state.tapeLength = 0;
        state.timer = 0;
        state.recording = false;
        state.playing = false;
        clearInterval(state.timerInterval);
        clearInterval(state.playerInterval);
      }
    },
    registerOnKeyDownListener(state) {
      if (!state.keyDownListenerAttached) {
        state.keyDownListenerAttached = true;
        window.addEventListener('keydown', state.onKeyDown.bind(state));
      }
    },
    animatePad(state, note) {
      state.activateNote(note);
      setTimeout(() => {
        state.deactivateNote(note);
      }, 150);
    },
    activateNote(state, note) {
      state.activeNote = note;
    },
    deactivateNote(state) {
      state.activeNote = null;
    },
    onKeyDown(state, event) {
      switch (event.keyCode) {
        case 90:
          state.playSound('G#');
          state.animatePad('G#');
          break;
        case 88:
          state.playSound('A');
          state.animatePad('A');
          break;
        case 67:
          state.playSound('Bb');
          state.animatePad('Bb');
          break;
        case 86:
          state.playSound('B');
          state.animatePad('B');
          break;
        case 65:
          state.playSound('E');
          state.animatePad('E');
          break;
        case 83:
          state.playSound('F');
          state.animatePad('F');
          break;
        case 68:
          state.playSound('F#');
          state.animatePad('F#');
          break;
        case 70:
          state.playSound('G');
          state.animatePad('G');
          break;
        case 81:
          state.playSound('C');
          state.animatePad('C');
          break;
        case 87:
          state.playSound('C#');
          state.animatePad('C#');
          break;
        case 69:
          state.playSound('D');
          state.animatePad('D');
          break;
        case 82:
          state.playSound('Eb');
          state.animatePad('Eb');
          break;
        case 32:
          state.toggleRecording();
          break;
        case 49:
          state.setWave('sine');
          break;
        case 50:
          state.setWave('square');
          break;
        case 51:
          state.setWave('triangle');
          break;
        case 52:
          state.setWave('sawtooth');
          break;
        case 8:
          state.clear();
          break;
        case 13:
          state.togglePlayer();
          break;
        default:
          break;
      }
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
    setTrack({ commit }, trackNumber) {
      commit('setTrack', trackNumber);
    },
    setPanner({ commit }, event) {
      commit('setPanner', event);
    },
    togglePanner({ commit }) {
      commit('togglePanner');
    },
    playSound({ commit }, note) {
      commit('playSound', note);
    },
    beep({ commit }, sounds) {
      commit('beep', sounds);
    },
    animateSkeletons({ commit }) {
      commit('animateSkeletons');
    },
    togglePlayer({ commit }) {
      commit('togglePlayer');
    },
    toggleRecording({ commit }) {
      commit('toggleRecording');
    },
    clear({ commit }) {
      commit('clear');
    },
    registerOnKeyDownListener({ commit }) {
      commit('registerOnKeyDownListener');
    },
    animatePad({ commit }, note) {
      commit('animatePad', note);
    },
    activateNote({ commit }, note) {
      commit('activateNote', note);
    },
    deactivateNote({ commit }) {
      commit('deactivateNote');
    },
    onKeyDown({ commit }, event) {
      commit('onKeyDown', event);
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
