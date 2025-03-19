
import React, { useState } from "react";
import "./App.css";
import Playlist from "./Playlist";
import Status from "./Status";
import Controls from "./controls";

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [tracks, setTracks] = useState([]);

  return (
    <div>
      <h1>Audio Player</h1>
      <Playlist
        setTracks={setTracks}
        setCurrentTrack={setCurrentTrack}
        currentTrack={currentTrack} // Pass the current playing track
      />
      <Status currentTrack={currentTrack} />
      <Controls tracks={tracks} setCurrentTrack={setCurrentTrack} />
    </div>
  );
}

export default App;