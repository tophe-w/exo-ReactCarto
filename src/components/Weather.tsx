import React, { useEffect, useState } from "react";
import './weather.css';


interface WeatherProps{
    lat: number;
    lng: number;

}
interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
  }[];
}

const Weather: React.FC<WeatherProps> =({ lat, lng}) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  
  
   

    useEffect(() => {
        if (lat && lng) {
            const apiUrl = `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
            fetch(apiUrl)
            .then(response => response.json())
            .then((data: WeatherData) => {
                console.log("Données pour coordonnées :", data);
                setWeatherData(data);
            })
            .catch(error => console.error("Erreur lors de la récupération des données météo :", error));
        }
    }, [lat, lng]);

    if (weatherData) {
        return (
            <div className="weather">
                <h1>{weatherData.name}</h1>
                <div className="info">
                    <p>Température : {weatherData.main.temp}°C</p>
                    <p>Condition: {weatherData.weather[0].main}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="weather">
                
                <h1>Weather</h1>
                <p>Aucune donnée météorologique disponible pour les coordonnées spécifiées.</p>
            </div>
        );
    }
}
export default Weather;