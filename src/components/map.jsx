import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(1.8815349);
  const [lat, setLat] = useState(48.4158051);
  const [lng2, setLng2] = useState(2.330041);
  const [lat2, setLat2] = useState(48.8688897);
  const [zoom] = useState(8);
  const [API_KEY] = useState("nMRnsGMXjAaVfcwJhzLn");
  const marker = useRef(null);
  const marker2 = useRef(null);


  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    marker.current = new maplibregl.Marker({ color: "#383EE1" })
      .setLngLat([lng, lat])
      .addTo(map.current);

    marker2.current = new maplibregl.Marker({ color: "#000" })
      .setLngLat([lng2, lat2])
      .addTo(map.current);
  }, [API_KEY, lng, lat, lng2, lat2, zoom]);

  useEffect(() => {
    if (marker.current) {
      marker.current.setLngLat([lng, lat]);
    }
  }, [lng, lat]);

  useEffect(() => {
    if (marker2.current) {
      marker2.current.setLngLat([lng2, lat2]);
    }
  }, [lng2, lat2]);

  return (
    <div className="map-wrap">
       <a href="https://www.coordonnees-gps.fr/" target="_blank" rel="noreferrer">Find your adress <img src="/emplacement.png" alt="point" className="icone" /> </a>
      <div className="markers">
        <div>
          <h2>Blue Marker</h2>
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(parseFloat(e.target.value))}
            placeholder="Longitude"
          />
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(parseFloat(e.target.value))}
            placeholder="Latitude"
          />
        </div>
        <div>
          <h2>Black Marker</h2>
          <input
            type="number"
            value={lng2}
            onChange={(e) => setLng2(parseFloat(e.target.value))}
            placeholder="Longitude"
          />
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
