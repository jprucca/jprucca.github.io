export default {
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
      setTimeout(() => {
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
      }, 0);
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

      commit('pushCurrentSoundToRecorder', { trackNumber: state.track, timer: state.timer, sound });
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
  registerAudioContext({ commit }) {
    commit('registerAudioContext');
  },
};
