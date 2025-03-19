import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Status from './Status';
import '@testing-library/jest-dom';


describe("Status Component", () => {
  test("renders 'Paused' when no track is playing", () => {
    render(<Status currentTrack={null} />);
    expect(screen.getByText("Paused")).toBeInTheDocument();
  });

  test("displays the current track when playing", () => {
    render(<Status currentTrack="Test Song" />);
    expect(screen.getByText("Playing: Test Song")).toBeInTheDocument();
  });
});