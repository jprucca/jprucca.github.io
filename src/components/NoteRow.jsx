import React from 'react';
import Note from './Note';

const NoteRow = ({ notes, onMouseDown, activeNote }) => (
  <React.Fragment>
    {notes.map((note, idx) => 
      <Note activeNote={activeNote} note={note.note} shortcut={note.shortcut} onMouseDown={onMouseDown} key={idx + note} />
    )}
  </React.Fragment>
);

export default NoteRow;