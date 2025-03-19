import React from 'react';
import { useState, useEffect } from "react";

function Playlist({ setTracks, setCurrentTrack, currentTrack }) {
  const [audioData, setAudioData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/audio") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched audio data:", data);
        setAudioData(data);
        setTracks(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Find the current track's full details
  const currentSong = audioData.find(
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