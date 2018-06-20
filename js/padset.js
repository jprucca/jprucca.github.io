SOUNDS.playSound = function(event) {
    var octave = SOUNDS.octave;
    var note = event.target.getAttribute('data-note') || event.note;
    var frequency = SOUNDS.notes[octave][note];
    var sound = {
        frequency: frequency,
        wave: SOUNDS.wave,
        length: parseFloat(SOUNDS.length),
        // noteLength: SOUNDS.noteLength,
        volume: parseFloat(SOUNDS.volume)
    };

    SOUNDS.beep([sound]);
    
    
    if (SOUNDS.recording) {
        var isAnySavedSound = SOUNDS.tape.some(function (tape) {
            return tape.data.length > 0;
        });
        if (!isAnySavedSound) {
            SOUNDS.timer = 10;
        }
        if (SOUNDS.tape[SOUNDS.track].data[SOUNDS.timer]) {
            SOUNDS.tape[SOUNDS.track].data[SOUNDS.timer].push(sound);
        } else {
            SOUNDS.tape[SOUNDS.track].data[SOUNDS.timer] = [];
            SOUNDS.tape[SOUNDS.track].data[SOUNDS.timer].push(sound);
        }
    }
}
