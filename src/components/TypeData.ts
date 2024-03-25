export interface WeatherProps {
    lngLat: number[];
    onWeatherDataReceived: (data: WeatherData) => void;
}

export interface WeatherData {
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

export interface WeatherTranslations {
    conditions: {
        [key: string]: string;
    };
}
export interface MapProps {
    lngLat: number[];
    setLngLat: React.Dispatch<React.SetStateAction<number[]>>;
    weatherData : WeatherData | null
}