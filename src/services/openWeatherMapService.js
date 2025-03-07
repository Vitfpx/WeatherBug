import axios from "axios";

// const BASE_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${API_KEY}`;
const API_KEY = "43f30ac51a6ea6560bcfc2bd967e7c73";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Função para buscar dados meteorológicos
 * @param {string} endpoint - Endpoint da API ('weather'/'forecast')
 * @param {object} params - Parâmetros adicionais da requisição
 */

const fetchWeatherData = async (endpoint, params) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        ...params,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching ${endpoint} data:`,
      error.response?.data || error
    );
    return null;
  }
};

/**
 * Dados Climáticos atuais
 * @param {string} city - Nome da Cidade
 */
export const getWeather = (city) => fetchWeatherData("weather", { q: city });

/**
 *Obtém a previsão do tempo para as próximas horas
 *@param {string} city - Nome da cidade
 */
export const getTodaysForecast = (city) =>
  fetchWeatherData("forecast", { q: city });

/**
 * Obtém chance de chuva e nebulosidade (estimativa de UV Index)
 * @param {string} city - Nome da cidade
 */
export const getWeatherDetails = async (city) => {
  const data = await fetchWeatherData("forecast", { q: city });

  if (!data || !data.list || data.list.length === 0) return null;
  const forecastData = data.list[0];
  return {
    chanceOfRain:
      forecastData.pop !== undefined
        ? Math.round(forecastData.pop * 100) + "%"
        : "N/A",
    cloudiness:
      forecastData.clouds?.all !== undefined ? forecastData.clouds.all : "N/A",
  };
};

/**
 * Obter UV Index a partir dos dados da API
 * @param {string} city - Nome da cidade
 */
export const getUVIndex = async (city) => {
  const weatherData = await fetchWeatherData("weather", { q: city });

  if (!weatherData || !weatherData.coord) return null;

  const { lat, lon } = weatherData.coord;

  const airData = await fetchWeatherData("air_pollution", {
    lon: lon,
    lat: lat,
  });

  if (!airData || !airData.list || airData.list.length === 0) return null;

  return { uvIndex: airData.list[0].main.aqi };
};
