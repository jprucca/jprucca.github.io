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
        if (SOUNDS.tape[SOUNDS.track].data.length && SOUNDS.playing) {
            clearInterval(SOUNDS.playerInterval);
            clearInterval(SOUNDS.timerInterval);
            SOUNDS.timer = 0;
            SOUNDS.playing = !SOUNDS.playing;
            SOUNDS.togglePlayer();
        } else if (!SOUNDS.tape[SOUNDS.track].data.length){
            SOUNDS.togglePlayer();
        }
        
        document.getElementById('track1').classList.remove('active');
        document.getElementById('track2').classList.remove('active');
        document.getElementById('track3').classList.remove('active');
        document.getElementById('track4').classList.remove('active');
        document.getElementById('track5').classList.remove('active');
        document.getElementById('track6').classList.remove('active');
        document.getElementById('track7').classList.remove('active');
        document.getElementById('track8').classList.remove('active');
        
        element.classList.add('active');
    }
}
