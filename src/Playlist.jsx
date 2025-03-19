import React from 'react';
import { useState, useEffect } from "react";
import audioData from './audio.json';

function Playlist({ setTracks, setCurrentTrack, currentTrack }) {
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    // Use the imported data directly
    const audioArray = audioData.audio || audioData;
    console.log("Using audio data:", audioArray);
    setSongData(audioArray);
    setTracks(audioArray);
  }, [setTracks]);

  // Find the current track's full details
  const currentSong = songData.find(
    (song) => song.title === currentTrack
  );

  return (
    <div className="playlist">
      <h2>Now Playing</h2>
      {currentSong ? (
        <div className="current-song">
          <h3>{currentSong.title}</h3>
          <p>{currentSong.artist} - {currentSong.year}</p>
        </div>
      ) : (
        <p>No song is currently playing</p>
      )}
    </div>
  );
}

export default Playlist;