window.SOUNDS = {
    audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
    octave: 4,
    bpm: 120,
    noteLength: 1,
    volume: 1,
    wave: 'sine',
    timer: 0,
    ms: 10,
    tape: [],
    tapeLength: 0,
    recording: false,
    playing: false,
    timerInterval: null,
    playerInterval: null
};
