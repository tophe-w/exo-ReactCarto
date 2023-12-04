import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";

const ZOOM = 8;
const API_KEY = "nMRnsGMXjAaVfcwJhzLn";

export default function Map({ lat, lng, setLat, setLng, lat2, lng2, setLat2, setLng2 } ) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const marker2 = useRef(null);


  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
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
  }, [API_KEY, lng, lat, lng2, lat2, ZOOM]);

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
        <div>
          <h2>Blue Marker</h2>
          <label>Longitude</label>
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(parseFloat(e.target.value))}
            placeholder="Longitude"
          />
          <label>Latitude</label>
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(parseFloat(e.target.value))}
            placeholder="Latitude"
          />
        </div>
        <div>
          <h2>Black Marker</h2>
          <label>Longitude</label>
          <input
            type="number"
            value={lng2}
            onChange={(e) => setLng2(parseFloat(e.target.value))}
            placeholder="Longitude"
          />
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
