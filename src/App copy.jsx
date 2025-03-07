import { useState } from "react";
import { weatherIcons } from "./app/mockWeatherIcons";
import {
  getTodaysForecast,
  getWeather,
  getWeatherDetails,
  getUVIndex,
} from "./services/weatherService";
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
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    setError("");

    try {
      const weatherData = await getWeather(city);
      if (!weatherData) {
        setError("City not found. Try again");
        return;
      }

      setWeather(weatherData);

      const forecastData = await getTodaysForecast(city);
      setForecast(forecastData?.list.slice(0, 7) || []);

      const details = await getWeatherDetails(city);
      setWeatherdDetails(details);

      const uv = await getUVIndex(city);
      setUvIndex(uv?.uvIndex ?? "N/A");
    } catch {
      setError("Error when searching for climate data.");
    }
  };

  const iconSrc = forecast.map((item) => {
    const condition = item.weather[0]?.main;
    return weatherIcons[condition] || "/icons/default.png";
  });

  return (
    <main className="font-sf-pro flex p-4 gap-4 flex-row bg-gray-400 w-screen h-screen">
      <NavSideBar />
      <div className="flex flex-col justify-between">
        <SearchBar onSearch={handleSearch} />
        {error && <p className="text-red-500">{error}</p>}
        {weather && (
          <>
            <WeatherDisplay weather={weather} />
            <TodaysForecast forecast={forecast} icon={iconSrc} />
            <AirConditions
              weather={weather}
              weatherDetails={weatherDetails}
              uvIndex={uvIndex}
            />
          </>
        )}
      </div>
      {weather && <WeeksForecast />}
    </main>
  );
}
