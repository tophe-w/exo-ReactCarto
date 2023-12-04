import React, { Component, useEffect, useState } from "react";
import Navbar from "./components/navbar.jsx";
import Map from "./components/map.jsx";
import "./App.css";
import Weather from "./components/weather.jsx";

class App extends Component {
  state = {
    lat: 48.4158051,
    lng: 1.8815349,
    lat2: 48.8688897,
    lng2: 2.330041,
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

  render() {
    return (
      <div className="App">
        <Navbar />
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
        <Weather 
        lat={this.state.lat} lng={this.state.lng} 
        lat2={this.state.lat2} lng2={this.state.lng2}
        />
      </div>
    );
  }
}

export default App;
