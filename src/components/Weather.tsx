import React, { useEffect, useState } from "react";
import "./weather.scss";
import weatherTranslations from "../data/weatherTranslations.json";

interface WeatherProps {
  lngLat: number[];
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

const Weather: React.FC<WeatherProps> = ({ lngLat }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (lngLat) {
      const apiUrl = `${process.env.REACT_APP_API_URL}/weather?lat=${lngLat[1]}&lon=${lngLat[0]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
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
  }, [lngLat]);

  if (weatherData) {
    const weatherDescription: string = weatherData.weather[0].description;
    const translatedWeather: WeatherTranslations = weatherTranslations;
    const translatedDescription =
      translatedWeather.conditions[weatherDescription];

    return (
      <div
        className={`weather ${
          weatherData.weather[0].main === "Clear"
            ? "clear"
            : weatherData.weather[0].main === "Clouds"
            ? "clouds"
            : weatherData.weather[0].main === "Snow"
            ? "snow"
            : weatherData.weather[0].main === "Thunderstorm"
            ? "thunderstorm"
            : weatherData.weather[0].main === "Drizzle"
            ? "drizzle"
            : weatherData.weather[0].main === "Rain"
            ? "rain"
            : ""
        }`}
      >
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
