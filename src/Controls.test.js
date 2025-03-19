import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Controls from "./Controls"; 
import "@testing-library/jest-dom";

describe("Controls Component", () => {
  let mockSetCurrentTrack;
  let sampleTracks;

  beforeEach(() => {
    mockSetCurrentTrack = jest.fn();
    sampleTracks = [
      { title: "Song A" },
      { title: "Song B" },
      { title: "Song C" },
    ];
  });

  test("renders all control buttons", () => {
    render(<Controls tracks={sampleTracks} setCurrentTrack={mockSetCurrentTrack} />);
    
    expect(screen.getByText("Shuffle")).toBeInTheDocument();
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Play")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("disables all buttons when tracks list is empty", () => {
    render(<Controls tracks={[]} setCurrentTrack={mockSetCurrentTrack} />);
    
    expect(screen.getByText("Shuffle")).toBeDisabled();
    expect(screen.getByText("Prev")).toBeDisabled();
    expect(screen.getByText("Play")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });

  test("calls setCurrentTrack when Play button is clicked", () => {
    render(<Controls tracks={sampleTracks} setCurrentTrack={mockSetCurrentTrack} />);
    
    const playButton = screen.getByText("Play");
    fireEvent.click(playButton);
    
    expect(mockSetCurrentTrack).toHaveBeenCalledWith("Song A");
    expect(playButton).toHaveTextContent("Pause"); // Play should toggle to Pause
  });

  test("calls setCurrentTrack with next track when Next button is clicked", () => {
    render(<Controls tracks={sampleTracks} setCurrentTrack={mockSetCurrentTrack} />);
    
    fireEvent.click(screen.getByText("Next"));
    expect(mockSetCurrentTrack).toHaveBeenCalledWith("Song B");
  });

  test("calls setCurrentTrack with previous track when Prev button is clicked", () => {
    render(<Controls tracks={sampleTracks} setCurrentTrack={mockSetCurrentTrack} />);
    
    fireEvent.click(screen.getByText("Next")); // Move to Song B
    fireEvent.click(screen.getByText("Prev")); // Go back to Song A
    
    expect(mockSetCurrentTrack).toHaveBeenCalledWith("Song A");
  });

  test("shuffles tracks when Shuffle button is clicked", () => {
    render(<Controls tracks={sampleTracks} setCurrentTrack={mockSetCurrentTrack} />);
    
    fireEvent.click(screen.getByText("Shuffle"));
    expect(mockSetCurrentTrack).toHaveBeenCalled();
  });

  test("stops playing when Pause is clicked", () => {
    render(<Controls tracks={sampleTracks} setCurrentTrack={mockSetCurrentTrack} />);
    
    const playButton = screen.getByText("Play");
    fireEvent.click(playButton); // Play
    fireEvent.click(playButton); // Pause

    expect(mockSetCurrentTrack).toHaveBeenCalledWith(null);
    expect(playButton).toHaveTextContent("Play"); // Should toggle back to Play
  });

  test("does not crash if track titles are missing", () => {
    const invalidTracks = [{}, { episodeTitle: "Podcast A" }];
    render(<Controls tracks={invalidTracks} setCurrentTrack={mockSetCurrentTrack} />);
    
    fireEvent.click(screen.getByText("Play"));
    expect(mockSetCurrentTrack).toHaveBeenCalled();
  });
});