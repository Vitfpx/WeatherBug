import PropTypes from "prop-types";
import WeatherImage from "./WeatherImage";

export default function WeatherDisplay({ weather }) {
  if (!weather)
    return (
      <p className="text-center text-gray-100 py-12 text-3xl">
        Busque uma cidade...
      </p>
    );

  return (
    <article className="flex justify-between text-white p-2 -mt-2 rounded-lg text-center">
      <div className="flex flex-col items-start justify-between pl-4">
        <div className="text-left">
          <h1 className="text-[28px] font-bold mb-1">{weather.name}</h1>
          <p className="text-sm text-gray-100/80">
            Humidity: {weather.main.humidity}%
          </p>
        </div>
        <div>
          <span className="text-4xl font-bold">
            {Math.round(weather.main.temp)}ºC
          </span>
        </div>
      </div>
      <div>
        <WeatherImage weatherData={weather} />
      </div>
    </article>
  );
}

WeatherDisplay.propTypes = {
  weather: PropTypes.shape({
    name: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
  }),
};
