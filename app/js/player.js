SOUNDS.togglePlayer = function () {
    if (!SOUNDS.recording) {
        if (!SOUNDS.playing && SOUNDS.tape.length) {
            document.getElementById('play').innerHTML = '<span>STOP</span>';
            document.getElementById('play').classList.add('active');
            SOUNDS.playing = true;
            
            SOUNDS.playerInterval = setInterval(function () {
                SOUNDS.timer = 0;
            }, SOUNDS.tapeLength);
            
            SOUNDS.timerInterval = setInterval(function () {
                SOUNDS.timer += SOUNDS.ms;
                if (SOUNDS.tape[SOUNDS.timer]) {
                    SOUNDS.beep(SOUNDS.tape[SOUNDS.timer]);
                }
            }, SOUNDS.ms);
        } else {
            document.getElementById('play').innerHTML = '<span>PLAY</span>';
            document.getElementById('play').classList.remove('active');
            clearInterval(SOUNDS.playerInterval);
            clearInterval(SOUNDS.timerInterval);
            SOUNDS.playing = false;
            SOUNDS.timer = 0;
        }
    }    
};
