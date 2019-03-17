import React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';

import { Provider } from 'mobx-react';
import Recorder from './models/RecorderModel';
import Root from './components/Root';
import Notes from './models/NotesModel';

const stores = {
  recorderStore: new Recorder(),
  notesStore: new Notes(),
}

render(
  <React.Fragment>
    <DevTools />
    <Provider {...stores}>
      <Root />
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);

if (stores.recorderStore.audioCtx.state === 'suspended') {
  stores.recorderStore.audioCtx.resume();
}