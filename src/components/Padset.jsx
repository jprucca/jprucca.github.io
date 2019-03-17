import React from 'react';
import { inject, observer } from 'mobx-react';

import '../css/pad';
import '../css/padset';
import Notes from './Notes';
import CommandPad from './CommandPad';

const Padset = inject('recorderStore')(observer(({recorderStore}) => {
  const toggleRecording = () => () => recorderStore.toggleRecording();
  const togglePlayer = () => () => recorderStore.togglePlayer();
  const clear = () => () => recorderStore.clear();
  const setWave = (wave) => () => recorderStore.setWave(wave);

  return (
    <div className="padset">
      <br />
      <CommandPad active={recorderStore.recording} text="RECORD" shortcut="spc" onMouseDown={toggleRecording} />
      {recorderStore.playing ? 
        <CommandPad active={recorderStore.playing} text="STOP" shortcut="enter" onMouseDown={togglePlayer} />
        :
        <CommandPad text="START" shortcut="enter" onMouseDown={togglePlayer} />
      }
      <CommandPad text="CLEAR" shortcut="back" onMouseDown={clear} />
      <br /><br />

      <CommandPad active={recorderStore.wave === 'sine'} text="Sine" shortcut="1" onMouseDown={setWave('sine')} />
      <CommandPad active={recorderStore.wave === 'square'} text="Square" shortcut="2" onMouseDown={setWave('square')} />
      <CommandPad active={recorderStore.wave === 'triangle'} text="Triangle" shortcut="3" onMouseDown={setWave('triangle')} />
      <CommandPad active={recorderStore.wave === 'sawtooth'} text="Sawtooth" shortcut="4" onMouseDown={setWave('sawtooth')} />
      {/* <span onMouseDown={setWave('sine')} id="sine" className={`pad condensed ${recorderStore.wave === 'sine' ? 'active' : ''}`} >
        <span>Sine <b>[1]</b></span>
      </span>
      <span onMouseDown={setWave('square')} id="square" className={`pad condensed ${recorderStore.wave === 'square' ? 'active' : ''}`}>
        <span>Square <b>[2]</b></span>
      </span>
      <span onMouseDown={setWave('triangle')} id="triangle" className={`pad condensed ${recorderStore.wave === 'triangle' ? 'active' : ''}`} >
        <span>Triangle <b>[3]</b></span>
      </span>
      <span onMouseDown={setWave('sawtooth')} id="sawtooth" className={`pad condensed ${recorderStore.wave === 'sawtooth' ? 'active' : ''}`} >
        <span>Sawtooth <b>[4]</b></span>
      </span> */}
      <br /><br /><br /><br /><br /><br /><br /><br />

      <Notes />
    </div>
  );
}));

export default Padset;