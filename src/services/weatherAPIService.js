import axios from "axios";

const API_KEY = "dd581f43838d41e6b25144736250603";

export const getWeatherFromWeatherAPI = async (city) => {
  try {
    const response = await axios.get(
      "http://api.weatherapi.com/v1/forecast.json",
      {
        params: {
          key: API_KEY,
          q: city,
          days: 7,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data from WeatherAPI", error);
    return null;
  }
};
