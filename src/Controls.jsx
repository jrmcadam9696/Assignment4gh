import React from "react"
import { useState } from "react";

function Controls({ tracks = [], setCurrentTrack }) { // Default empty array
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  console.log("Tracks in Controls:", tracks); // Debugging

  const shuffleTracks = () => {
    if (tracks.length === 0) return;
    
    const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);
    setCurrentIndex(0);

    const firstTrack = shuffledTracks[0];
    setCurrentTrack(firstTrack?.title || firstTrack?.episodeTitle || null);
  };

  const handlePrev = () => {
    if (tracks.length === 0) return;

    const newIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentIndex(newIndex);

    const prevTrack = tracks[newIndex];
    setCurrentTrack(prevTrack?.title || prevTrack?.episodeTitle);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (tracks.length === 0) return;

    const newIndex = (currentIndex + 1) % tracks.length;
    setCurrentIndex(newIndex);

    const nextTrack = tracks[newIndex];
    setCurrentTrack(nextTrack?.title || nextTrack?.episodeTitle);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (tracks.length === 0) return;

    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const currentTrack = tracks[currentIndex];
      setCurrentTrack(currentTrack?.title || currentTrack?.episodeTitle);
    } else {
      setCurrentTrack(null);
    }
  };

  return (
    <div className="controls">
      <button onClick={shuffleTracks} disabled={tracks.length === 0}>Shuffle</button>
      <button onClick={handlePrev} disabled={tracks.length === 0}>Prev</button>
      <button onClick={handlePlayPause} disabled={tracks.length === 0}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button onClick={handleNext} disabled={tracks.length === 0}>Next</button>
    </div>
  );
}

export default Controls;