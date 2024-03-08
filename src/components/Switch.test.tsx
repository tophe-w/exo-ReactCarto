import React from "react";
import { render, screen } from "@testing-library/react";
import Switch from "./Switch";

describe("<Switch>", () => {
  it("renders without crashing", () => {
    render(
      <Switch switchName="marker" useBlackMarker={false} onChange={jest.fn()} />
    );
  });

  it("should be unchecked", () => {
    render(
      <Switch switchName="marker" useBlackMarker={false} onChange={jest.fn()} />
    );
    expect(
      screen.getByRole("checkbox", { name: "marker-switch" })
    ).toBeTruthy();
  });
});
