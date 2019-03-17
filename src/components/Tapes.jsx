import React from 'react';
import TrackButton from './TrackButton';
import { inject, observer } from 'mobx-react';

const tapesAmount = [0,1,2,3];

const Tapes = inject('recorderStore')(observer(({ active, recorderStore }) => {
  const setTrack = () => (trackNumber) => () => recorderStore.setTrack(trackNumber);

  return (
    <div className="tapes-container">
      <div>
        {tapesAmount.map((_, idx) =>
          <TrackButton
            active={recorderStore.tape[idx].active}
            current={recorderStore.tape[idx].current}
            track={idx}
            key={idx}
            onClick={setTrack(idx)} />
        )}
      </div>
    </div>
  )
}));

export default Tapes;