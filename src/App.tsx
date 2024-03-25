import React, { useState } from "react";
import Navbar from "./components/Navbar.tsx";
import Map from "./components/Map.tsx";
import "./App.scss";
import Weather from "./components/Weather.tsx";
import { WeatherData } from "./components/TypeData.ts";

function App() {
  const [lngLat, setLngLat] = useState([1.8815349, 48.4158051]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const handleWeatherDataReceived = (data: WeatherData) => {
    setWeatherData(data);
  };

 
  return (
    <div className="App">
      <Navbar />
      <div className="mapWeather">
        <Map lngLat={lngLat} setLngLat={setLngLat} weatherData={weatherData} />
        <div className="weatherSwitch">
          <Weather
            lngLat={lngLat}
            onWeatherDataReceived={handleWeatherDataReceived}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
