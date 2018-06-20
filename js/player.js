SOUNDS.togglePlayer = function () {
    if (!SOUNDS.recording) {
        if (!SOUNDS.playing && SOUNDS.tape[SOUNDS.track].data.length) {
            document.getElementById('play').innerHTML = '<span>STOP [enter]</span>';
            document.getElementById('play').classList.add('active');
            SOUNDS.playing = true;

            SOUNDS.playerInterval = setInterval(function () {
                SOUNDS.timer = 0;
            }, SOUNDS.tapeLength);
            
            SOUNDS.timerInterval = setInterval(function () {
            SOUNDS.timer += SOUNDS.ms;
            SOUNDS.tape.forEach(function(tape) {
                if (tape.active) {
                    if (tape.data[SOUNDS.timer]) {
                        SOUNDS.beep(tape.data[SOUNDS.timer]);
                    }
                }
            });
                // SOUNDS.timer += SOUNDS.ms;
                // if (SOUNDS.tape[0].active) {
                //     if (SOUNDS.tape[0].data[SOUNDS.timer]) {
                //         SOUNDS.beep(SOUNDS.tape[0].data[SOUNDS.timer]);
                //     }
                // }
                // if (SOUNDS.tape[1].active) {
                //     if (SOUNDS.tape[1].data[SOUNDS.timer]) {
                //         SOUNDS.beep(SOUNDS.tape[1].data[SOUNDS.timer]);
                //     }
                // }
                // if (SOUNDS.tape[2].active) {
                //     if (SOUNDS.tape[2].data[SOUNDS.timer]) {
                //         SOUNDS.beep(SOUNDS.tape[2].data[SOUNDS.timer]);
                //     }
                // }
                // if (SOUNDS.tape[3].active) {
                //     if (SOUNDS.tape[3].data[SOUNDS.timer]) {
                //         SOUNDS.beep(SOUNDS.tape[3].data[SOUNDS.timer]);
                //     }
                // }
            }, SOUNDS.ms);

            
        } else {
            document.getElementById('play').innerHTML = '<span>PLAY [enter]</span>';
            document.getElementById('play').classList.remove('active');
            clearInterval(SOUNDS.playerInterval);
            clearInterval(SOUNDS.timerInterval);
            SOUNDS.playing = false;
            SOUNDS.timer = 0;
        }
    }    
};
