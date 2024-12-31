import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "@/App";

test("renders the App component", () => {
  render(<App />);
  const element = screen.getByText("Hello Ankit");
  expect(element).toBeInTheDocument();
});
