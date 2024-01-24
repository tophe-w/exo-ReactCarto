import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";

const ZOOM :number = 10;
const API_KEY: string = "nMRnsGMXjAaVfcwJhzLn";

interface MapProps {
  lat: number;
  lng: number;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number>>;
  lat2: number;
  lng2: number;
  setLat2: React.Dispatch<React.SetStateAction<number>>;
  setLng2: React.Dispatch<React.SetStateAction<number>>;
}

const Map: React.FC<MapProps> =({
  lat,
  lng,
  setLat,
  setLng,
  lat2,
  lng2,
  setLat2,
  setLng2,
}) => {
 const mapContainer = useRef<HTMLDivElement | null>(null);
 const map = useRef<maplibregl.Map | null>(null);
 const marker = useRef<maplibregl.Marker | null>(null);
 const marker2 = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) {
      console.log("mapContainer.current is null");
     return};
   

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/satellite/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: ZOOM,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    marker.current = new maplibregl.Marker({ color: "#383EE1" })
      .setLngLat([lng, lat])
      .addTo(map.current);

    marker2.current = new maplibregl.Marker({ color: "#000" })
      .setLngLat([lng2, lat2])
      .addTo(map.current);
  }, []);

  useEffect(() => {
    if (marker.current && !isNaN(lng) && !isNaN(lat)) {
      marker.current.setLngLat([lng, lat]);
    }
  }, [lng, lat]);

  useEffect(() => {
    if (marker2.current && !isNaN(lng2) && !isNaN(lat2)) {
      marker2.current.setLngLat([lng2, lat2]);
    }
  }, [lng2, lat2]);

  return (
    <div className="map-wrap">
      <a
        href="https://www.coordonnees-gps.fr/"
        target="_blank"
        rel="noreferrer"
      >
        Find your adress{" "}
        <img src="/emplacement.png" alt="point" className="icone" />{" "}
      </a>
      <div className="markers">
        <div className="blueMarker">
          <h2 style={{ color: "#383EE1" }}>Blue Marker</h2>
          <label>Longitude</label>
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(parseFloat(e.target.value))}
            placeholder="Longitude"
          />
          <br />
          <label>Latitude</label>
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(parseFloat(e.target.value))}
            placeholder="Latitude"
          />
        </div>
        <div className="blackMarker">
          <h2>Black Marker</h2>
          <label>Longitude</label>
          <input
            type="number"
            value={lng2}
            onChange={(e) => setLng2(parseFloat(e.target.value))}
            placeholder="Longitude"
          />
          <br />
          <label>Latitude</label>
          <input
            type="number"
            value={lat2}
            onChange={(e) => setLat2(parseFloat(e.target.value))}
            placeholder="Latitude"
          />
        </div>
      </div>
      <div ref={mapContainer} className="map" />
    </div>
  );
}
export default Map;