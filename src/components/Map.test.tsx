// Mocking performance.mark
window.performance.mark = jest.fn();


import React from "react";
import { render } from "@testing-library/react";
import Map from "./Map";

describe("<Map>", () => {
  it("renders without crashing", () => {
    render( 
      <Map
        lat={48.4158051}
        lng={1.8815349}
        setLat={() => {}}
        setLng={() => {}}
        lat2={48.8688897}
        lng2={2.330041}
        setLat2={() => {}}
        setLng2={() => {}}
      />
    );
  });
});
