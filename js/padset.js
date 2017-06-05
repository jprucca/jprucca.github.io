SOUNDS.playSound = function(event) {
    var octave = SOUNDS.octave;
    var note = event.target.getAttribute('data-note');
    var frequency = SOUNDS.notes[octave][note];
    var sound = {
        frequency: frequency,
        wave: SOUNDS.wave,
        bpm: SOUNDS.bpm,
        noteLength: SOUNDS.noteLength
    };
    
    if (!SOUNDS.tape[SOUNDS.track].data.length) {
        SOUNDS.timer = 10;
    }
    if (SOUNDS.recording) {
        if (SOUNDS.tape[SOUNDS.track].data[SOUNDS.timer]) {
            SOUNDS.tape[SOUNDS.track].data[SOUNDS.timer].push(sound);
        } else {
            SOUNDS.tape[SOUNDS.track].data[SOUNDS.timer] = [];
            SOUNDS.tape[SOUNDS.track].data[SOUNDS.timer].push(sound);
        }
    }
    
    SOUNDS.beep([sound]);
}
