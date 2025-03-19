import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Playlist from "./Playlist";
import '@testing-library/jest-dom';

// Mock the audio.json import
jest.mock('./audio.json', () => ({
  audio: [
    { title: 'Song 1', artist: 'Artist 1', year: 2020 },
    { title: 'Song 2', artist: 'Artist 2', year: 2021 },
  ]
}), { virtual: true });

describe('Playlist Component', () => {
  const setTracksMock = jest.fn();
  const setCurrentTrackMock = jest.fn();
  
  beforeEach(() => {
    // Clear previous mocks
    jest.clearAllMocks();
  });
  
  it('renders "No song is currently playing" when no current track is provided', async () => {
    render(
      <Playlist
        setTracks={setTracksMock}
        setCurrentTrack={setCurrentTrackMock}
        currentTrack=""
      />
    );
    
    // Should render the "no song playing" message
    expect(screen.getByText('No song is currently playing')).toBeInTheDocument();
  });
  
  it('displays the current song when a valid currentTrack is provided', async () => {
    render(
      <Playlist
        setTracks={setTracksMock}
        setCurrentTrack={setCurrentTrackMock}
        currentTrack="Song 1"
      />
    );
    
    // Wait for the effect to run and component to update
    await waitFor(() => {
      expect(screen.getByText('Song 1')).toBeInTheDocument();
      expect(screen.getByText('Artist 1 - 2020')).toBeInTheDocument();
    });
  });
  
  it('calls setTracks with the audio data', async () => {
    render(
      <Playlist
        setTracks={setTracksMock}
        setCurrentTrack={setCurrentTrackMock}
        currentTrack=""
      />
    );
    
    // Wait for the useEffect to run
    await waitFor(() => {
      expect(setTracksMock).toHaveBeenCalledWith([
        { title: 'Song 1', artist: 'Artist 1', year: 2020 },
        { title: 'Song 2', artist: 'Artist 2', year: 2021 },
      ]);
    });
  });
  
  it('console logs the audio data correctly', async () => {
    // Mock console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(
      <Playlist
        setTracks={setTracksMock}
        setCurrentTrack={setCurrentTrackMock}
        currentTrack=""
      />
    );
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Using audio data:",
        expect.arrayContaining([
          expect.objectContaining({ title: 'Song 1' }),
          expect.objectContaining({ title: 'Song 2' })
        ])
      );
    });
    
    consoleSpy.mockRestore();
  });
});