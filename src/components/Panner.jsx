import React from 'react';
import { inject, observer } from 'mobx-react';

const Panner = inject('recorderStore')(observer(({ recorderStore }) => {
  const togglePanner = () => recorderStore.togglePanner();
  const setPanner = (event) => recorderStore.setPanner(event);

  return (
    <div className={`panner ${recorderStore.activatePanner ? 'active' : ''}`} onClick={togglePanner} onMouseMove={setPanner}>
      Panner
    </div>
  )
}));

export default Panner;