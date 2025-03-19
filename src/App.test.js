import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App"; 
import "@testing-library/jest-dom";


describe('App Component', () => {
  test('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText('Audio Player')).toBeInTheDocument();
  });

  test('renders Playlist, Status, and Controls components', () => {
    render(<App />);
    
    expect(screen.getByText('Audio Player')).toBeInTheDocument();
    
    
    expect(screen.getByTestId('playlist-component')).toBeInTheDocument();
    expect(screen.getByTestId('status-component')).toBeInTheDocument();
    expect(screen.getByTestId('controls-component')).toBeInTheDocument();
  });
});
