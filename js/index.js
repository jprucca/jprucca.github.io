window.SOUNDS = {
    audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
    octave: 4,
    length: 1,
    // noteLength: 1,
    volume: 0.1,
    wave: 'sine',
    timer: 0,
    ms: 10,
    tape: [
        {data: [], active: false, current: false},
        {data: [], active: false, current: false},
        {data: [], active: false, current: false},
        {data: [], active: false, current: false},
        {data: [], active: false, current: false},
        {data: [], active: false, current: false},
        {data: [], active: false, current: false},
        {data: [], active: false, current: false}
    ],
    tapeLength: 0,
    track: 0,
    recording: false,
    playing: false,
    timerInterval: null,
    playerInterval: null,
    registerOnKeyDownListener: null,
    onKeyDown: null,
    animatePad: null,
    setPanner: null,
    panner: {x: 0, y: 0, z: 0},
    activatePanner: false
};


if (SOUNDS.audioCtx.state === 'suspended') {
    SOUNDS.audioCtx.resume();
}
