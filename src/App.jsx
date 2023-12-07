import React, { Component, useEffect, useState } from "react";
import Navbar from "./components/navbar.jsx";
import Map from "./components/map.jsx";
import "./App.css";
import Weather from "./components/weather.jsx";
import Switch from "./components/switch.jsx";

class App extends Component {
  state = {
    lat: 48.4158051,
    lng: 1.8815349,
    lat2: 48.8688897,
    lng2: 2.330041,
    useBlackMarker: false,
  };
  setLat = (lat) => {
    this.setState({ lat });
  };

  setLng = (lng) => {
    this.setState({ lng });
  };

  setLat2 = (lat2) => {
    this.setState({ lat2 });
  };

  setLng2 = (lng2) => {
    this.setState({ lng2 });
  };
  handleSwitchChange = (e) => {
    this.setState({ useBlackMarker: e.target.checked });
  };

  render() {
    const { lat, lng, lat2, lng2, useBlackMarker } = this.state;
    const coords = useBlackMarker ? { lat: lat2, lng: lng2 } : { lat, lng };

    return (
      <div className="App">
        <Navbar />
        <div className="mapWeather">
          <Map
            lat={this.state.lat}
            lng={this.state.lng}
            setLat={this.setLat}
            setLng={this.setLng}
            lat2={this.state.lat2}
            lng2={this.state.lng2}
            setLat2={this.setLat2}
            setLng2={this.setLng2}
          />
          <div className="weatherSwitch">
            <Weather {...coords} />
            <Switch label="marker" onChange={this.handleSwitchChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
