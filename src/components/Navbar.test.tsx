import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
describe("<Navbar>", () => {
  it("renders without crashing", () => {
    render(<Navbar />);
  });
});

test("titre", () => {
  render(<Navbar />);
 expect(screen.getByRole("heading", {name: "Carto"})).toBeTruthy();
});
