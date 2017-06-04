SOUNDS.setOctave = function (event) {
    SOUNDS.octave = event.target.value;
}
SOUNDS.setBpm = function (event) {
    SOUNDS.bpm = event.target.value;
}
SOUNDS.setNoteLenght = function (event) {
    SOUNDS.noteLength = event.target.value;
}
SOUNDS.setVolume = function (event) {
    SOUNDS.volume = event.target.value;
}
SOUNDS.setWave = function (event) {
    var element = event.target.getAttribute('data-value') ? event.target : event.target.parentElement;
    SOUNDS.wave = element.getAttribute('data-value');
    
    document.getElementById('sine').classList.remove('active');
    document.getElementById('square').classList.remove('active');
    document.getElementById('triangle').classList.remove('active');
    document.getElementById('sawtooth').classList.remove('active');
    
    element.classList.add('active');
}
