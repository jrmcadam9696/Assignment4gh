import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Podcast from './Podcast';
import '@testing-library/jest-dom';

describe('Podcast Component', () => {
    test('renders with given props', () => {
      render(<Podcast season={1} episode={5} episodeTitle="Test Episode" setCurrentTrack={jest.fn()} />);
      
      expect(screen.getByText('Test Episode')).toBeInTheDocument();
      expect(screen.getByText('Season 1 Episode 5')).toBeInTheDocument();
    });
  
    test('triggers setCurrentTrack on click', () => {
      const mockSetCurrentTrack = jest.fn();
      render(<Podcast season={2} episode={3} episodeTitle="Another Episode" setCurrentTrack={mockSetCurrentTrack} />);
  
      fireEvent.click(screen.getByText('Another Episode'));
      expect(mockSetCurrentTrack).toHaveBeenCalledWith('Another Episode');
    });
  
    test('renders correctly when season is not provided', () => {
      render(<Podcast episode={10} episodeTitle="Standalone Episode" setCurrentTrack={jest.fn()} />);
      
      expect(screen.getByText('Standalone Episode')).toBeInTheDocument();
      expect(screen.getByText('Episode 10')).toBeInTheDocument();
    });
  });
  