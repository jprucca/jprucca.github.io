import React from 'react';

const TrackButton = ({active, current, onClick, track}) => {
  const getTrackClassNames = () => {
    let className = '';
    if (active) {
      className += ' active'
      if (current) {
        className += ' current'
      }
    }
    return className;
  };

  return (
    <span className={`pad small ${getTrackClassNames()}`} id="track1" onClick={onClick(track)}>
      <span>{track + 1}</span>
    </span>
  );
};

export default TrackButton;