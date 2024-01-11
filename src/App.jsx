import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Map from "./components/Map.jsx";
import "./App.css";
import Weather from "./components/Weather.jsx";
import Switch from "./components/Switch.jsx";

function App() {
  const [lat, setLat] = useState(48.4158051);
  const [lng, setLng] = useState(1.8815349);
  const [lat2, setLat2] = useState(48.8688897);
  const [lng2, setLng2] = useState(2.330041);
  const [useBlackMarker, setUseBlackMarker] = useState(false);

  const handleSwitchChange = (e) => {
    setUseBlackMarker(e.target.checked);
  };

  const coords = useBlackMarker ? { lat: lat2, lng: lng2 } : { lat, lng };

  return (
    <div className="App">
      <Navbar />
      <div className="mapWeather">
        <Map
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
          lat2={lat2}
          lng2={lng2}
          setLat2={setLat2}
          setLng2={setLng2}
        />
        <div className="weatherSwitch">
          <Weather {...coords} />
          <Switch label="marker" onChange={handleSwitchChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
