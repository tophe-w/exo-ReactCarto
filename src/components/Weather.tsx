import React, { useEffect, useState } from "react";
import "./weather.scss";
import weatherTranslations from "../data/weatherTranslations.json";
import { WeatherData, WeatherProps, WeatherTranslations } from "./TypeData";


const OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

function getCssWeatherClass(weatherData: WeatherData) {
  let weatherClass = "";
  switch (weatherData.weather[0].main) {
    case "Clear":
      weatherClass = "clear";
      break;
    case "Clouds":
      weatherClass = "clouds";
      break;
    case "Snow":
      weatherClass = "snow";
      break;
    case "Thunderstorm":
      weatherClass = "thunderstorm";
      break;
    case "Drizzle":
      weatherClass = "drizzle";
      break;
    case "Rain":
      weatherClass = "rain";
      break;
    default:
      weatherClass = "other";
  }
  return weatherClass;
}

const Weather: React.FC<WeatherProps> = ({ lngLat, onWeatherDataReceived }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (lngLat) {
      const apiUrl = `${OPENWEATHER_API_URL}/weather?lat=${lngLat[1]}&lon=${lngLat[0]}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data: WeatherData) => {
          setWeatherData(data);
          onWeatherDataReceived(data);
        })
        .catch((error) =>
          console.error(
            "Erreur lors de la récupération des données météo :",
            error
          )
        );
    }
  }, [lngLat]);

  useEffect(() => {
    if (weatherData) {
      onWeatherDataReceived(weatherData);
    }
  }, [weatherData, onWeatherDataReceived]);

  if (weatherData) {
    const weatherDescription: string = weatherData.weather[0].description;
    const translatedWeather: WeatherTranslations = weatherTranslations;
    const translatedDescription =
      translatedWeather.conditions[weatherDescription].charAt(0).toUpperCase() +
      translatedWeather.conditions[weatherDescription].slice(1);

    return (
      <div className={`weather ${getCssWeatherClass(weatherData)}`}>
        <div className="nameAndCondition">
          <h1>{weatherData.name}</h1>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="imgWeather"
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
