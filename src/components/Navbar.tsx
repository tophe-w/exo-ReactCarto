import React from 'react';
import './navbar.css';

const Navbar: React.FC = () =>{
  return (
    <div className="heading">
      <img className="iconsTerre" src={"/terre.png"} alt="iconTerre" />
      <h1>Explorer le Globe et sa Météo</h1>
      <img className="iconsApp" src={"/application-meteo.png"} alt="iconApp" />
    </div>
  );
}
export default Navbar;