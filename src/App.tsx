import React, { useState, ChangeEvent } from "react";
import Navbar from "./components/Navbar.tsx";
import Map from "./components/Map.tsx";
import "./App.css";
import Weather from "./components/Weather.tsx";
import Switch from "./components/Switch.tsx";

function App() {
  const [lat, setLat] = useState(48.4158051);
  const [lng, setLng] = useState(1.8815349);

  

  return (
    <div className="App">
      <Navbar />
      <div className="mapWeather">
        <Map lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
        <div className="weatherSwitch">
          <Weather lat={lat} lng={lng} />
        </div>
      </div>
    </div>
  );
}

export default App;
