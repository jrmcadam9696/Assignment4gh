import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Song from './Song';
import '@testing-library/jest-dom';

test('renders song details and handles click event', () => {
  const mockSetCurrentTrack = jest.fn();
  const songProps = {
    title: 'Test Song',
    artist: 'Test Artist',
    year: '2025',
    setCurrentTrack: mockSetCurrentTrack
  };

  render(<Song {...songProps} />);

  // Check if song details render correctly
  expect(screen.getByText('Test Song')).toBeInTheDocument();
  expect(screen.getByText('Test Artist - 2025')).toBeInTheDocument();

  // Simulate click event
  fireEvent.click(screen.getByText('Test Song'));
  expect(mockSetCurrentTrack).toHaveBeenCalledWith('Test Song');
});
