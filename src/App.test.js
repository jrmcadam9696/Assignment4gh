import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

// Mock CSS import
jest.mock("./App.css", () => ({}), { virtual: true });

// Mock child components
jest.mock("./Playlist", () => () => <div data-testid="playlist-component">Playlist</div>);
jest.mock("./Status", () => () => <div data-testid="status-component">Status</div>);
jest.mock("./controls", () => () => <div data-testid="controls-component">Controls</div>);

describe("App Component", () => {
  test("renders the main heading", () => {
    render(<App />);
    expect(screen.getByText("Audio Player")).toBeInTheDocument();
  });

  test("renders Playlist, Status, and Controls components", () => {
    render(<App />);

    expect(screen.getByTestId("playlist-component")).toBeInTheDocument();
    expect(screen.getByTestId("status-component")).toBeInTheDocument();
    expect(screen.getByTestId("controls-component")).toBeInTheDocument();
  });
});