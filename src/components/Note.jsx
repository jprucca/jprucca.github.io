import React from 'react';

const Note = ({ note, shortcut, onMouseDown, activeNote }) => {
  const handleMouseDown = () => onMouseDown(note);
  return (
    <span className={`pad ${activeNote === note ? 'active' : ''}`} onMouseDown={handleMouseDown}>
    <span>{ note } <b>[{ shortcut }]</b></span>
  </span>
)
};

export default Note;