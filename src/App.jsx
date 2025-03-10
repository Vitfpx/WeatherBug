import { useState } from "react";
import { LoadingSpinner } from "../src/components/LoadingSpinner";
import { weatherIcons } from "./app/mockWeatherIcons";
import {
  getTodaysForecast,
  getWeather,
  getWeatherDetails,
  getUVIndex,
} from "./services/openWeatherMapService";
import { getWeatherFromWeatherAPI } from "./services/weatherAPIService";
import NavSideBar from "./components/NavSideBar";
import WeatherDisplay from "./app/weather-info/WeatherDisplay";
import SearchBar from "./components/SearchBar";
import TodaysForecast from "./app/weather-info/TodaysForecast";
import WeeksForecast from "./app/WeeksForecast";
import AirConditions from "./app/weather-info/AirConditions";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [weatherDetails, setWeatherdDetails] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [weekForecast, setWeekForecast] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city) => {
    setError("");
    setIsLoading(true);

    try {
      const weatherData = await getWeather(city);
      if (!weatherData) {
        setError("City not found. Try again");
        setIsLoading(false);
        return;
      }
      setWeather(weatherData);

      const forecastData = await getTodaysForecast(city);

      if (forecastData) {
        const numberOfForecasts =
          window.innerWidth <= 768 ? 3 : window.innerWidth <= 1024 ? 5 : 7;
        setForecast(forecastData?.list.slice(0, numberOfForecasts) || []);
      }
      console.log(forecast);

      const details = await getWeatherDetails(city);
      setWeatherdDetails(details);

      const uv = await getUVIndex(city);
      setUvIndex(uv?.uvIndex ?? "N/A");

      const weekForecastData = await getWeatherFromWeatherAPI(city);
      setWeekForecast(weekForecastData?.forecast?.forecastday || []);
    } catch {
      setError("Error when searching for climate data.");
    } finally {
      setIsLoading(false);
    }
  };

  const iconSrc = forecast.map((item) => {
    const condition = item.weather[0]?.main;
    return weatherIcons[condition] || "/icons/default.png";
  });

  return (
    <main className="font-sf-pro flex flex-col md:flex-row p-4 gap-4 bg-gray-400 w-full min-h-screen overflow-auto">
      <NavSideBar className="w-full md:w-1/4 lg:w-1/5" />
      <div className="flex gap-2 flex-col w-full justify-start md:gap-4 md:w-3/4 lg:w-2/3">
        <SearchBar onSearch={handleSearch} />
        {error && <p className="text-red-500">{error}</p>}
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <LoadingSpinner />
          </div>
        ) : (
          weather && (
            <>
              <WeatherDisplay weather={weather} />
              <TodaysForecast forecast={forecast} icon={iconSrc} />
              <AirConditions
                weather={weather}
                weatherDetails={weatherDetails}
                uvIndex={uvIndex}
              />
            </>
          )
        )}
      </div>
      {weather && !isLoading && (
        <div className="w-full md:w-full lg:w-3/4">
          <WeeksForecast forecast={weekForecast} />
        </div>
      )}
    </main>
  );
  
}
