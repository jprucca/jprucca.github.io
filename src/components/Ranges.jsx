import React from 'react';
import { inject, observer } from 'mobx-react';

const Ranges = inject('recorderStore')(observer(({ recorderStore }) => {
  const setVolume = (event) => recorderStore.setVolume(event.target.value);
  const setNoteLength = (event) => recorderStore.setNoteLength(event.target.value);
  const setOctave = (event) => recorderStore.setOctave(event.target.value);

  return (
    <div className="ranges">
      <input type="range" min="0.1" max="1" value={recorderStore.volume} step="0.01" onChange={setVolume} />
      <input type="range" min="0.1" max="10" value={recorderStore.noteLength} step="0.01" onChange={setNoteLength} />
      <input type="range" min="0" max="7" value={recorderStore.octave} onChange={setOctave} />
      <div>
        <div className="command-label">
          Volume
          </div>
        <div className="command-label">
          Length
          </div>
        <div className="command-label">
          Octave
          </div>
      </div>
    </div>
  )
}));

export default Ranges;