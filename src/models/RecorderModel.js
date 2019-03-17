import { observable, action } from 'mobx';
import Notes from './NotesModel';

export default class Recorder {
  @observable audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  @observable octave = 4;
  @observable noteLength = 1;
  @observable volume = 0.1;
  @observable wave = 'sine';
  @observable timer = 0;
  @observable ms = 10;
  @observable tape = [
    { data: {}, active: true, current: true },
    { data: {}, active: false, current: false },
    { data: {}, active: false, current: false },
    { data: {}, active: false, current: false },
  ];
  @observable tapeLength = 0;
  @observable track = 0;
  @observable recording = false;
  @observable playing = false;
  @observable timerInterval = null;
  @observable playerInterval = null;
  @observable panner = { x: 0, y: 0, z: 0 };
  @observable activatePanner = false;
  @observable notes = [];
  @observable keyDownListenerAttached = false;
  @observable activeSkeleton = 3;
  @observable activeNote = null;

  constructor () {
    this.notes = new Notes().notes;
    this.registerOnKeyDownListener();
  }

  @action('[Recorder] setOctave')
  setOctave(value) {
    this.octave = value;
  };

  @action('[Recorder] setNoteLenght')
  setNoteLength(value) {
    this.noteLength = parseFloat(value);
  };

  @action('[Recorder] setVolume')
  setVolume(value) {
    this.volume = parseFloat(value);
  };

  @action('[Recorder] setWave')
  setWave(value) {
    this.wave = value;
  };

  @action('[Recorder] setTrack')
  setTrack(trackNumber) {
    if (!this.recording) {
      this.track = parseInt(trackNumber);

      this.tape.forEach((tape) => tape.current = false);

      this.tape[this.track].current = !this.tape[this.track].current;

      if (this.tape[this.track].current && !this.tape[this.track].active) {
        this.tape[this.track].active = true;
      } else if (this.tape[this.track].current && this.tape[this.track].active) {
        this.tape[this.track].active = false;
      }
    }
  }

  @action('[Recorder] setPanner')
  setPanner(event) {
    if (this.activatePanner) {
      this.panner = { x: (event.clientX - 150) / 10, y: 0, z: 0 };
    }
  }

  @action('[Recorder] togglePanner')
  togglePanner() {
    if (this.activatePanner) {
      this.panner = { x: 0, y: 0, z: 0 };
      this.activatePanner = false;
    } else {
      this.activatePanner = true;
    }
  }

  @action('[Recorder] playSound')
  playSound(note) {
    const octave = this.octave;
    const frequency = this.notes[octave][note];
    const sound = {
      frequency: frequency,
      wave: this.wave,
      length: this.noteLength,
      volume: this.volume
    };

    this.beep([sound]);

    if (this.recording) {
      const isAnySavedSound = this.tape.some((tape) => Object.keys(tape.data).length > 0);

      if (!isAnySavedSound) {
        this.timer = 10;
      }
      if (this.tape[this.track].data[this.timer]) {
        this.tape[this.track].data[this.timer].push(sound);
      } else {
        this.tape[this.track].data[this.timer] = [];
        this.tape[this.track].data[this.timer].push(sound);
      }
    }
  }

  @action('[Recorder] beep')
  beep(sounds) {
    sounds.forEach((sound) => {
      let o = this.audioCtx.createOscillator(),
        g = this.audioCtx.createGain(),
        length = sound.length;

      if (sound.frequency) {
        o.type = sound.wave;

        g.gain.value = sound.volume;
        g.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + length);

        const panner = this.audioCtx.createPanner();
        panner.setPosition(this.panner.x, 0, 1);

        o.frequency.value = sound.frequency;
        o.connect(panner);
        panner.connect(g);
        g.connect(this.audioCtx.destination);
        o.start(this.audioCtx.currentTime);
        o.stop(this.audioCtx.currentTime + length);
      }
    });

    this.animateSkeletons();
  };

  @action('[Recorder] animateSkeletons')
  animateSkeletons() {
    const min = 1;
    const max = 5;
    this.activeSkeleton = this.activeSkeleton === max ? min : this.activeSkeleton + 1;
  };

  @action('[Recorder] togglePlayer')
  togglePlayer() {
    if (!this.recording) {
      if (!this.playing && Object.keys(this.tape[this.track].data).length) {
        this.playing = true;

        this.playerInterval = setInterval(() => {
          this.timer = 0;
        }, this.tapeLength);

        this.timerInterval = setInterval(() => {
          this.timer += this.ms;
          this.tape.forEach((tape) => {
            if (tape.active) {
              if (tape.data[this.timer]) {
                this.beep(tape.data[this.timer]);
              }
            }
          });
        }, this.ms);

      } else {
        clearInterval(this.playerInterval);
        clearInterval(this.timerInterval);
        this.playing = false;
        this.timer = 0;
      }
    }
  };

  @action('[Recorder] toggleRecording')
  toggleRecording() {
    if (!this.recording) {
      this.recording = true;

      if (!this.tape.some(tape => tape.active)) {
        this.tape[0].active = true;
        this.tape[0].current = true;
      }

      if (!this.playing) {
        this.timerInterval = setInterval(() => this.timer += this.ms, this.ms);
      }
    } else {
      this.recording = false;

      if (!this.tapeLength) {
        this.tapeLength = this.timer;
      }

      if (!this.playing) {
        clearInterval(this.timerInterval);
        this.tapeLength = this.timer;
        this.timer = 0;
        this.togglePlayer();
      }
    }
  }

  @action('[Recorder] clear')
  clear() {
    this.tape[this.track].data = {};
    var hasData = this.tape.some((tape) => Object.keys(tape.data).length > 0)
    if (!hasData) {
      this.tapeLength = 0;
      this.timer = 0;
      this.recording = false;
      this.playing = false;
      clearInterval(this.timerInterval);
      clearInterval(this.playerInterval);
    }
  }

  @action('[Recorder] registerOnKeyDownListener')
  registerOnKeyDownListener() {
    if (!this.keyDownListenerAttached) {
      this.keyDownListenerAttached = true;
      window.addEventListener('keydown', this.onKeyDown.bind(this));
    }
  }

  @action('[Recorder] animatePad')
  animatePad(note) {
    this.activateNote(note);
    setTimeout(() => {
      this.deactivateNote(note)
    }, 150);
  }

  @action('[Recorder] activateNote')
  activateNote(note) {
    this.activeNote = note;
  }

  @action('[Recorder] deactivateNote')
  deactivateNote() {
    this.activeNote = null;
  }

  @action('[Recorder] onKeyDown')
  onKeyDown(event) {
    switch (event.keyCode) {
      case 90:
        this.playSound('G#');
        this.animatePad('G#');
        break;
      case 88:
        this.playSound('A');
        this.animatePad('A');
        break;
      case 67:
        this.playSound('Bb');
        this.animatePad('Bb');
        break;
      case 86:
        this.playSound('B');
        this.animatePad('B');
        break;
      case 65:
        this.playSound('E');
        this.animatePad('E');
        break;
      case 83:
        this.playSound('F');
        this.animatePad('F');
        break;
      case 68:
        this.playSound('F#');
        this.animatePad('F#');
        break;
      case 70:
        this.playSound('G');
        this.animatePad('G');
        break;
      case 81:
        this.playSound('C');
        this.animatePad('C');
        break;
      case 87:
        this.playSound('C#');
        this.animatePad('C#');
        break;
      case 69:
        this.playSound('D');
        this.animatePad('D');
        break;
      case 82:
        this.playSound('Eb');
        this.animatePad('Eb');
        break;
      case 32:
        this.toggleRecording();
        break;
      case 49:
        this.setWave('sine');
        break;
      case 50:
        this.setWave('square');
        break;
      case 51:
        this.setWave('triangle');
        break;
      case 52:
        this.setWave('sawtooth');
        break;
      case 8:
        this.clear();
        break;
      case 13:
        this.togglePlayer();
    }
  };

}