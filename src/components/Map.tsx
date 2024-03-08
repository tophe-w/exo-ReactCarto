import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";

const ZOOM: number = 10;
const API_KEY: string = "nMRnsGMXjAaVfcwJhzLn";
const initialViewState = {
  lat: 48,
  lng: 1.8,
  zoom: 3.5,
};

interface MapProps {
  lat: number;
  lng: number;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number>>;
}



const Map: React.FC<MapProps> = ({ lat, lng, setLat, setLng }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markerCoordinates = useRef<{ lat: number; lng: number }>({
    lat: initialViewState.lat,
    lng: initialViewState.lng,
  });

  useEffect(() => {
    if (!mapContainer.current) {
      return;
    }

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
      center: [initialViewState.lng, initialViewState.lat],
      zoom: initialViewState.zoom,
    });
    map.current.addControl(
      new maplibregl.NavigationControl({ showCompass: true }),
      "top-right"
    );
    const marker = new maplibregl.Marker({ draggable: true, color: "#383EE1", })
      .setLngLat([1.8, 48])
      .addTo(map.current);

    function onDragEnd(event: maplibregl.MapMouseEvent) {
      const lngLat = marker.getLngLat();
      setLat(lngLat.lat);
      setLng(lngLat.lng);
      console.log("Coordonnées du marqueur :", lngLat.lng, lngLat.lat);
    }
    
    marker.on("dragend", onDragEnd);

 
}, []);
  

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" >
      <div id="coordinates" className="coordinates">
        Longitude: {lng.toFixed(2)}
        <br />
        Latitude: {lat.toFixed(2)}
        </div>
        </div>
    </div>
  );
};
export default Map;
