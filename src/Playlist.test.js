import React from "react";
import { render, screen } from "@testing-library/react";
import Playlist from "./Playlist";
import '@testing-library/jest-dom';

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { title: 'Song 1', artist: 'Artist 1', year: 2020 },
        { title: 'Song 2', artist: 'Artist 2', year: 2021 },
      ]),
    })
  );
  
  describe('Playlist Component', () => {
    const setTracksMock = jest.fn();
    const setCurrentTrackMock = jest.fn();
  
    beforeEach(() => {
      // Clear previous mocks
      fetch.mockClear();
      setTracksMock.mockClear();
      setCurrentTrackMock.mockClear();
    });
  
    it('renders "No song is currently playing" when no current song is provided', async () => {
      render(
        <Playlist
          setTracks={setTracksMock}
          setCurrentTrack={setCurrentTrackMock}
          currentTrack=""
        />
      );
  
      await waitFor(() => {
        expect(screen.getByText('No song is currently playing')).toBeInTheDocument();
      });
    });
  
    it('displays the current song when a valid currentTrack is provided', async () => {
      render(
        <Playlist
          setTracks={setTracksMock}
          setCurrentTrack={setCurrentTrackMock}
          currentTrack="Song 1"
        />
      );
  
      await waitFor(() => {
        expect(screen.getByText('Song 1')).toBeInTheDocument();
        expect(screen.getByText('Artist 1 - 2020')).toBeInTheDocument();
      });
    });
  
    it('calls setTracks with the fetched audio data', async () => {
      render(
        <Playlist
          setTracks={setTracksMock}
          setCurrentTrack={setCurrentTrackMock}
          currentTrack="Song 1"
        />
      );
  
      await waitFor(() => {
        expect(setTracksMock).toHaveBeenCalledWith([
          { title: 'Song 1', artist: 'Artist 1', year: 2020 },
          { title: 'Song 2', artist: 'Artist 2', year: 2021 },
        ]);
      });
    });
  
    it('logs an error when fetching data fails', async () => {
      // Mock fetch to simulate an error
      global.fetch.mockImplementationOnce(() =>
        Promise.reject(new Error('Network response was not ok'))
      );
  
      render(
        <Playlist
          setTracks={setTracksMock}
          setCurrentTrack={setCurrentTrackMock}
          currentTrack="Song 1"
        />
      );
  
      await waitFor(() => {
        expect(global.console.error).toHaveBeenCalledWith('Error fetching data:', expect.any(Error));
      });
    });
  });