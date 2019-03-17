import React from 'react';

const CommandPad = ({ active, onMouseDown, text, shortcut }) => (
  <span className={`pad condensed ${active ? 'active' : ''}`} id="record" onMouseDown={onMouseDown}>
    <span>{text} <b>[{shortcut}]</b></span>
  </span>
);

export default CommandPad;