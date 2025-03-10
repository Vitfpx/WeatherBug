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
    <article className="flex flex-col-reverse items-center justify-between text-white p-2 md:p-8 lg:p-0.5 -mt-2 rounded-lg text-center md:flex-row md:text-left">
      <div className="flex flex-row w-full justify-between lg:p-2 space-y-6 md:flex-col md:items-start lg:pl-4">
        <div className="text-left">
          <h1 className="text-4xl md:text-[28px] font-bold">{weather.name}</h1>
          <p className="text-sm md:text-lg lg:text-sm text-gray-100/80">
            Humidity: {weather.main.humidity}%
          </p>
        </div>
        <div>
          <span className="text-4xl font-bold">
            {Math.round(weather.main.temp)}ºC
          </span>
        </div>
      </div>
      <div className="mt-4 md:mt-0">
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
