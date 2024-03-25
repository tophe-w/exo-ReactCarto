import React, { useRef, useEffect, useState } from "react";
import maplibregl, { MapMouseEvent, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.scss";
import { MapProps, WeatherData } from "./TypeData";

const ZOOM: number = 10;
const initialViewState = {
  lat: 48,
  lng: 1.8,
  zoom: 3.5,
};

const Map: React.FC<MapProps> = ({ lngLat, setLngLat, weatherData }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  function createPopupOnMapClick(e: MapMouseEvent) {
    const lngLat = e.lngLat;
    console.log("Coordonnées cliquées : ", lngLat);
    const popup = new maplibregl.Popup();
    if (map.current) {
      popup.setLngLat(lngLat);
      setLngLat([e.lngLat.lng, e.lngLat.lat]);
      popup.addTo(map.current);
      popup.setHTML(`
  <div>
    <p>Longitude: ${lngLat.lng.toFixed(2)}</p>
    <p>Latitude: ${lngLat.lat.toFixed(2)}</p>
    <img src="http://openweathermap.org/img/wn/${
      weatherData?.weather[0].icon
    }.png" alt="Weather Icon">
  </div>
`);
    }
  }

  useEffect(() => {
    if (!mapContainer.current) {
      return;
    }

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/satellite/style.json?key=${process.env.MAPLIBRE_API_KEY}`,
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
  }, []);

  // let marker = new maplibregl.Marker({ draggable: true, color: "#383EE1" })
  //   .setLngLat([1.8815349, 48.4158051])
  //   .addTo(map.current);

  useEffect(() => {
    if (!map.current) {
      return;
    }
    map.current.on("click", createPopupOnMapClick);

    //   if (marker) {

    //     marker.remove();
    //   }

    //   marker = new maplibregl.Marker({ color: "#383EE1" });
    //   marker.setLngLat(e.lngLat);
    //   if (map.current) {
    //     marker.addTo(map.current);
    //     setLngLat([e.lngLat.lng, e.lngLat.lat]);
    //   }
    // });
    return () => {
      map.current?.off("click", createPopupOnMapClick);
    };
  }, [weatherData]);

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
