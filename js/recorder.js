SOUNDS.toggleRecording = function () {
    if (!SOUNDS.recording) {
        document.getElementById('record').classList.add('active');
        SOUNDS.recording = true;
        if (!SOUNDS.playing) {
            SOUNDS.timerInterval = setInterval(function () {
                SOUNDS.timer += SOUNDS.ms;
            }, SOUNDS.ms);
        }
    } else {
        document.getElementById('record').classList.remove('active');
        SOUNDS.recording = false;
        
        if (!SOUNDS.tape[SOUNDS.track].tapeLength) {
            SOUNDS.tape[SOUNDS.track].tapeLength = SOUNDS.timer;
        }
        
        if (!SOUNDS.playing) {
            clearInterval(SOUNDS.timerInterval);
            SOUNDS.tape[SOUNDS.track].tapeLength = SOUNDS.timer;
            SOUNDS.timer = 0;
            SOUNDS.togglePlayer();
        }
    }
}

SOUNDS.clear = function () {
    SOUNDS.tape[SOUNDS.track] = {
        tapeLength: 0,
        data: []
    };
    SOUNDS.timer = 0;
    SOUNDS.recording = false;
    SOUNDS.playing = false;
    document.getElementById('record').classList.remove('active');
    document.getElementById('play').innerHTML = '<span>PLAY</span>';
    document.getElementById('play').classList.remove('active');
    clearInterval(SOUNDS.timerInterval);
    clearInterval(SOUNDS.playerInterval);
}
