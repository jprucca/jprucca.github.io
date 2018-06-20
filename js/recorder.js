SOUNDS.toggleRecording = function () {
    if (!SOUNDS.recording) {
        var isAnyActive = SOUNDS.tape.some(function (tape) { return tape.active});
        if (!isAnyActive) {
            SOUNDS.tape[0].active = true;
            SOUNDS.tape[0].current = true;
            var element = document.getElementById('track1');
            element.classList.add('active');
            element.classList.add('current');
        }
        
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
        
        if (!SOUNDS.tapeLength) {
            SOUNDS.tapeLength = SOUNDS.timer;
        }
        
        if (!SOUNDS.playing) {
            clearInterval(SOUNDS.timerInterval);
            SOUNDS.tapeLength = SOUNDS.timer;
            SOUNDS.timer = 0;
            SOUNDS.togglePlayer();
        }
    }
}

SOUNDS.clear = function () {
    SOUNDS.tape[SOUNDS.track].data = [];
    var hasData = SOUNDS.tape
        .some(function (tape) { return tape.data.length > 0; })
    if (!hasData) {
        SOUNDS.tapeLength = hasData ? SOUNDS.tapeLength : 0;
        SOUNDS.timer = 0;
        SOUNDS.recording = false;
        SOUNDS.playing = false;
        document.getElementById('record').classList.remove('active');
        document.getElementById('play').innerHTML = '<span>PLAY [enter]</span>';
        document.getElementById('play').classList.remove('active');
        clearInterval(SOUNDS.timerInterval);
        clearInterval(SOUNDS.playerInterval);
    }
}
