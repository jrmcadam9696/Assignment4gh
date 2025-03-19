import React from 'react';

function Status({ currentTrack }) {
  return (
    <div className="status">
      <p>{currentTrack ? `Playing: ${currentTrack}` : "Paused"}</p>
    </div>
  );
}

export default Status;