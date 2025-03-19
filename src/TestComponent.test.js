import React from "react";
import { render, screen } from "@testing-library/react";
import TestComponent from "./TestComponent";
import '@testing-library/jest-dom';


test("renders TestComponent", () => {
  render(<TestComponent />);
  expect(screen.getByText("Test Component")).toBeInTheDocument();
});