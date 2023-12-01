import React, { Component} from "react";
import Navbar from "./components/navbar.jsx";
import Map from "./components/map.jsx";
import "./App.css";


class App extends Component{
  render(){
    return(
      <div className="App">
          <Navbar />
          <Map />
         
      </div>
    );
  }
}

export default App;