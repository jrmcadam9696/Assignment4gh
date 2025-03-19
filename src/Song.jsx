import React from 'react';

const Song = ({ title, artist, year, setCurrentTrack }) => {
  if (!title || !artist) return null; 

  return (
    <div className="song" onClick={() => setCurrentTrack(title)}>
      <h3>{title}</h3>
      <p>{artist} - {year}</p>
    </div>
  );
};

export default Song;