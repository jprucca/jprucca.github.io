SOUNDS.beep = function (sounds) {
    sounds.forEach(function (sound) {
        var o = SOUNDS.audioCtx.createOscillator(), 
            g = SOUNDS.audioCtx.createGain(),
            length = sound.length;
            // noteLength = sound.noteLength, 
            // playLength = 0;
        
        // 1 second divided by number of beats per second times number of beats (length of a note)
        // playLength = 1/(bpm/60) * noteLength;
        
            
        if (sound.frequency) {
            o.type = sound.wave;   
            // var real = new Float32Array(SOUNDS.ethnic.real);
            // var imag = new Float32Array(SOUNDS.ethnic.imag);
            // var hornTable = SOUNDS.audioCtx.createPeriodicWave(real, imag); 
            // o.setPeriodicWave(hornTable);              
            
            g.gain.value = sound.volume;
            g.gain.exponentialRampToValueAtTime(0.001, SOUNDS.audioCtx.currentTime + length);
            
            panner = SOUNDS.audioCtx.createPanner();
            panner.setPosition((Math.random() * (-1 - 1) + 0.5).toFixed(4), 0, 1);
            
            o.frequency.value = sound.frequency;
            o.connect(panner);
            panner.connect(g);
            g.connect(SOUNDS.audioCtx.destination);
            o.start(SOUNDS.audioCtx.currentTime);
            o.stop(SOUNDS.audioCtx.currentTime + length);
            
        }
    });
    var min = 1;
    var max = 5;
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    var skeletonId = 'skeleton' + random;
    var skeletons = document.getElementsByClassName('skeleton');
    for (var i = 0; i < skeletons.length; i++) {
        skeletons[i].classList.remove('active');
    }
    document.getElementById(skeletonId).classList.add('active');
    
};



// var bufferSize = 4096;
// var numInputChannels = 1;
// var numOutputChannels = 1;
// var f = (function() {
//     var convolver = SOUNDS.audioCtx.createConvolver(),
//         noiseBuffer = SOUNDS.audioCtx.createBuffer(2, 0.5 * SOUNDS.audioCtx.sampleRate, SOUNDS.audioCtx.sampleRate),
//         left = noiseBuffer.getChannelData(0),
//         right = noiseBuffer.getChannelData(1);
//     for (var i = 0; i < noiseBuffer.length; i++) {
//         left[i] = Math.random() * 2 - 1;
//         right[i] = Math.random() * 2 - 1;
//     }
//     convolver.buffer = noiseBuffer;
//     return convolver;
//     })();

// SOUNDS.beep = function (frequency) {
//     // var oscillator = SOUNDS.audioCtx.createOscillator();
//     // var gainNode = SOUNDS.audioCtx.createGain();
//     // 
//     // oscillator.connect(gainNode);
//     // 
//     // gainNode.connect(SOUNDS.audioCtx.destination); 
//     // 
//     // 
//     // gainNode.gain.value = SOUNDS.volume;
//     // oscillator.frequency.value = frequency;
//     // oscillator.type = SOUNDS.wave;
//     // 
//     // oscillator.start();
//     // 
//     // setTimeout(function() { 
//     //     oscillator.stop();
//     //     // gainNode.gain.exponentialRampToValueAtTime(0.00001, SOUNDS.audioCtx.currentTime + (SOUNDS.sustain / 1000));
//     // }, SOUNDS.duration);
//     // 
//         
//     
//     var oscillator = SOUNDS.audioCtx.createOscillator()
//     var gainNode = SOUNDS.audioCtx.createGain();
//     var endTime = 0;
//     
//     gainNode.gain.value = SOUNDS.volume;
//     oscillator.type = SOUNDS.wave;
//     oscillator.frequency.value = frequency;
//     oscillator.connect(gainNode)
//     gainNode.connect(SOUNDS.audioCtx.destination)
//     oscillator.start()
//     oscillator.stop(SOUNDS.audioCtx.currentTime + SOUNDS.sustain)
//     // endTime = SOUNDS.audioCtx.currentTime + SOUNDS.sustain;
//     
//     // oscillator.stop(endTime);
//     // gainNode.gain.exponentialRampToValueAtTime(0.00001, endTime);
// };
