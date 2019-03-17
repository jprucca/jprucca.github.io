import React from 'react';
import { inject, observer } from 'mobx-react';
import NoteRow from './NoteRow'

const Notes = inject('recorderStore', 'notesStore')(observer(({ recorderStore, notesStore }) => {
  const playSound = () => (note) => recorderStore.playSound(note);

  return (
    <React.Fragment>
      <NoteRow activeNote={recorderStore.activeNote} notes={notesStore.notesRow1} onMouseDown={playSound()} />
      <br />
      <NoteRow activeNote={recorderStore.activeNote} notes={notesStore.notesRow2} onMouseDown={playSound()} />
      <br />
      <NoteRow activeNote={recorderStore.activeNote} notes={notesStore.notesRow3} onMouseDown={playSound()} />
    </React.Fragment>
  )
}));

export default Notes;