import React, { useRef, useEffect, useState } from "react";
import maplibregl, { Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.scss";

const ZOOM: number = 10;
const API_KEY: string = "nMRnsGMXjAaVfcwJhzLn";
const initialViewState = {
  lat: 48,
  lng: 1.8,
  zoom: 3.5,
};

interface MapProps {
  lngLat: number[];
  setLngLat: React.Dispatch<React.SetStateAction<number[]>>;
}

const Map: React.FC<MapProps> = ({ lngLat, setLngLat }) => {
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
    map.current.addControl(new maplibregl.FullscreenControl({}));
    map.current.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    let marker = new maplibregl.Marker({ draggable: true, color: "#383EE1" })
      .setLngLat([1.8815349, 48.4158051])
      .addTo(map.current);

    map.current?.on("click", function (e) {
      console.log("Coordonnées cliquées : ", e.lngLat);
      if (marker) {
        marker.remove();
      }
      marker = new maplibregl.Marker({ color: "#383EE1" });
      marker.setLngLat(e.lngLat);
      if (map.current) {
        marker.addTo(map.current);
        setLngLat([e.lngLat.lng, e.lngLat.lat]);
      }
    });
  }, []);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map">
        <div id="coordinates" className="coordinates">
          Longitude: {lngLat[0].toFixed(2)}
          <br />
          Latitude: {lngLat[1].toFixed(2)}
        </div>
      </div>
    </div>
  );
};
export default Map;
