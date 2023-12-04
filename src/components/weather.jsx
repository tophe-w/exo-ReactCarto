import React, { useEffect, useState } from "react";
import './weather.css';

export default function Weather({ lat, lng, lat2, lng2 }){
    const [weatherData, setWeatherData] = useState(null);
    const [weatherData2, setWeatherData2] = useState(null);

    console.log("Coordonnées 1:", lat, lng);
    console.log("Coordonnées 2:", lat2, lng2);

    useEffect(() => {
        if (lat && lng) {
            const apiUrl = `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("Données pour coordonnées 1:", data);
                setWeatherData(data);
            })
            .catch(error => console.error("Erreur lors de la récupération des données météo 1:", error));
        }
    }, [lat, lng]);

    useEffect(() => {
        if (lat2 && lng2) {
            const apiUrl = `${process.env.REACT_APP_API_URL}/weather?lat=${lat2}&lon=${lng2}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("Données pour coordonnées 2:", data);
                setWeatherData2(data);
            })
            .catch(error => console.error("Erreur lors de la récupération des données météo 2:", error));
        }
    }, [lat2, lng2]);

    if (weatherData || weatherData2) {
        return (
            <div className="weather">
                <h1>Weather</h1>
                {weatherData && (
                    <div>
                        <p>Température pour les coordonnées 1: {weatherData.main.temp}°C</p>
                        <p>Condition: {weatherData.weather[0].main}</p>
                    </div>
                )}
                {weatherData2 && (
                    <div>
                        <p>Température pour les coordonnées 2: {weatherData2.main.temp}°C</p>
                        <p>Condition: {weatherData2.weather[0].main}</p>
                    </div>
                )}
            </div>
        );
    }
    else {
        return (
            <div className="weather">
                <h1>Weather</h1>
                <p>Aucune donnée météorologique disponible pour les coordonnées spécifiées.</p>
            </div>
        );
    }
}