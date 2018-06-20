SOUNDS.setOctave = function (event) {
    SOUNDS.octave = event.target.value;
};
SOUNDS.setLength = function (event) {
    SOUNDS.length = event.target.value;
};
SOUNDS.setNoteLenght = function (event) {
    SOUNDS.noteLength = event.target.value;
};
SOUNDS.setVolume = function (event) {
    SOUNDS.volume = event.target.value;
};
SOUNDS.setWave = function (event) {
    var element = event.target.getAttribute('data-value') ? event.target : event.target.parentElement;
    SOUNDS.wave = element.getAttribute('data-value') || event.wave;
    
    document.getElementById('sine').classList.remove('active');
    document.getElementById('square').classList.remove('active');
    document.getElementById('triangle').classList.remove('active');
    document.getElementById('sawtooth').classList.remove('active');
    
    document.getElementById(SOUNDS.wave).classList.add('active');
};
SOUNDS.setTrack = function (event) {
    if (!SOUNDS.recording) {
        var element = event.target.getAttribute('data-value') ? event.target : event.target.parentElement;
        
        SOUNDS.track = parseInt(element.getAttribute('data-value'));

        SOUNDS.tape.forEach(function (tape, idx) {
            tape.current = false;
            document.getElementById('track' + (idx + 1)).classList.remove('current');
        });

        SOUNDS.tape[SOUNDS.track].current = !SOUNDS.tape[SOUNDS.track].current;
        element.classList.add('current');

        if (SOUNDS.tape[SOUNDS.track].current && !SOUNDS.tape[SOUNDS.track].active) {
            SOUNDS.tape[SOUNDS.track].active = true;
            element.classList.add('active');
        } else if (SOUNDS.tape[SOUNDS.track].current && SOUNDS.tape[SOUNDS.track].active) {
            SOUNDS.tape[SOUNDS.track].active = false;
            element.classList.remove('active');
        }
    }
}
SOUNDS.setPanner = function (event) {
    if (SOUNDS.activatePanner) {
        SOUNDS.panner = {x: (event.clientX - 150) / 10, y: 0, z: 0}; 
    }
}
SOUNDS.togglePanner = function (event) {
    if (SOUNDS.activatePanner) {
        SOUNDS.panner = {x: 0, y: 0, z: 0};
        event.target.classList.remove('active');
        SOUNDS.activatePanner = false;
    } else {
        SOUNDS.activatePanner = true;
        event.target.classList.add('active');
    }
}
