import { render, screen } from "@testing-library/react";
import Weather from "./Weather";


jest.mock("node-fetch");
describe("<Weather>", () => {
  it("renders without crashing", () => {
    render(<Weather lat={48.8566} lng={2.3522} />);
  });
it("should be title name", () => {
  render(<Weather lat={0} lng={0} />);
  expect(screen.getByRole("heading", { name: "Weather" })).toBeTruthy();
});

});




