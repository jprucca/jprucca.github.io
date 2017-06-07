SOUNDS.registerOnKeyDownListener = function () {
    window.addEventListener('keydown', SOUNDS.onKeyDown);    
}
SOUNDS.animatePad = function (note) {
    var el = document.getElementById('pad-' + note);
    el.classList.add('active');
    setTimeout(function () {
        el.classList.remove('active');
    }, 100);
}
SOUNDS.onKeyDown = function (event) {
    switch (event.keyCode) {
        case 90:
            event.note = 'G#';
            SOUNDS.animatePad(event.note);
            SOUNDS.playSound(event);
            break;
        case 88:
            event.note = 'A';
            SOUNDS.animatePad(event.note);
            SOUNDS.playSound(event);
            break; 
        case 67:
            event.note = 'Bb';
            SOUNDS.animatePad(event.note);
            SOUNDS.playSound(event);
            break;
        case 86:
            event.note = 'B';
            SOUNDS.animatePad(event.note);
            SOUNDS.playSound(event);
            break;
        case 65:
            event.note = 'E';
            SOUNDS.animatePad(event.note);
            SOUNDS.playSound(event);
            break;
        case 83:
            event.note = 'F';
            SOUNDS.animatePad(event.note);
            SOUNDS.playSound(event);
            break; 
        case 68:
            event.note = 'F#';
            SOUNDS.animatePad(event.note);
            SOUNDS.playSound(event);
            break;
        case 70:
            event.note = 'G';
            SOUNDS.animatePad(event.note);
            SOUNDS.playSound(event);
            break;
        case 81:
            event.note = 'C';
            SOUNDS.animatePad(event.note);
            SOUNDS.playSound(event);
            break;
        case 87:
            event.note = 'C#';
            SOUNDS.animatePad(event.note);
            SOUNDS.playSound(event);
            break; 
        case 69:
            event.note = 'D';
            SOUNDS.animatePad(event.note);
            SOUNDS.playSound(event);
            break;
        case 82:
            event.note = 'Eb';
            SOUNDS.animatePad(event.note);
            SOUNDS.playSound(event);
            break; 
        case 32:
            SOUNDS.toggleRecording();
            break; 
        case 49:
            event.wave = 'sine';
            SOUNDS.setWave(event);
            break; 
        case 50:
            event.wave = 'square';
            SOUNDS.setWave(event);
            break; 
        case 51:
            event.wave = 'triangle';
            SOUNDS.setWave(event);
            break; 
        case 52:
            event.wave = 'sawtooth';
            SOUNDS.setWave(event);
            break; 
        case 8:
            SOUNDS.clear();
            break; 
    }
};
