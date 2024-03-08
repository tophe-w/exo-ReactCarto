import React, { useEffect, useState } from "react";
import "./weather.css";
import weatherTranslations from "../data/weatherTranslations.json";

interface WeatherProps {
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
    description: string;
    icon: string;
  }[];
}
interface WeatherTranslations {
  conditions: {
    [key: string]: string;
  };
}

const Weather: React.FC<WeatherProps> = ({ lat, lng }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (lat && lng) {
      const apiUrl = `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data: WeatherData) => {
          setWeatherData(data);
        })
        .catch((error) =>
          console.error(
            "Erreur lors de la récupération des données météo :",
            error
          )
        );
    }
  }, [lat, lng]);

  if (weatherData) {
    const weatherDescription :string = weatherData.weather[0].description;
    const translatedWeather: WeatherTranslations =
      weatherTranslations as WeatherTranslations;
    const translatedDescription =
      translatedWeather.conditions[weatherDescription];
    return (
      <div
        className="weather"
        style={{
          backgroundColor:
            weatherData.weather[0].main === "Clear"
              ? "rgb(228, 106, 187)"
              : weatherData.weather[0].main === "Clouds"
              ? "rgb(128, 186, 183)"
              : "red",
        }}
      >
        <div className="nameAndCondition">
          <h1>{weatherData.name}</h1>
          <img 
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather Icon" className="imgWeather"
          />
        </div>

        <div className="info">
          <p>Température : {weatherData.main.temp}°C</p>
          <p>Condition: {translatedDescription}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="weather">
        <h1>Weather</h1>
        <p>
          Aucune donnée météorologique disponible pour les coordonnées
          spécifiées.
        </p>
      </div>
    );
  }
};
export default Weather;
