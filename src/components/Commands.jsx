import React from 'react';
import { inject, observer } from 'mobx-react';
import Tapes from './Tapes';
import Skeletons from './Skeletons';

import '../css/commands';
import '../css/range';
import Ranges from './Ranges';
import CommandPad from './CommandPad';

const Commands = inject('recorderStore')(observer(({ recorderStore }) => {
  

  return (
    <div className="commands">
      <Skeletons active={recorderStore.activeSkeleton} />
      <Ranges />
      {/* <Panner /> */}
      <Tapes />
    </div>
  )
}));

export default Commands;