import React, { useState } from "react";
import Navbar from "./components/Navbar.tsx";
import Map from "./components/Map.tsx";
import "./App.scss";
import Weather from "./components/Weather.tsx";

function App() {
  const [lngLat, setLngLat] = useState([1.8815349, 48.4158051]);

  return (
    <div className="App">
      <Navbar />
      <div className="mapWeather">
        <Map lngLat={lngLat} setLngLat={setLngLat} />
        <div className="weatherSwitch">
          <Weather lngLat={lngLat} />
        </div>
      </div>
    </div>
  );
}

export default App;
