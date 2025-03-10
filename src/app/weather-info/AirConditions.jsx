import { Thermometer, Droplet, Wind, Sun } from "lucide-react";
import PropTypes from "prop-types";

export default function AirConditions({ weather, weatherDetails, uvIndex }) {
  if (!weather || !weatherDetails) return null;

  const realFeel = Math.round(weather.main.feels_like) + "º";
  const windSpeed = (weather.wind.speed * 3.6).toFixed(1) + "km/h";
  const uv = uvIndex;
  const chanceOfRain = weatherDetails.chanceOfRain;

  return (
    <article className="rounded-2xl bg-gray-300 not-md:px-2 p-5 px-8 text-xs text-gray-100/80 space-y-2 md:space-y-0">
      <div className="flex flex-row not-md:flex-col not-md:items-center not-md:gap-3 justify-between items-start">
        <h2 className="not-md:text-center not-lg:text-lg font-bold text-left text-gray-100">
          AIR CONDITIONS
        </h2>
        <a
          href="https://www.weatherapi.com/weather/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-sm not-lg:text-lg cursor-pointer px-3.5 py-1.5 rounded-2xl not-lg:rounded-3xl -mt-1.5 bg-blue text-white transition duration-400 hover:text-blue hover:bg-white "
        >
          See more
        </a>
      </div>

      <div className="text-white px-4 pt-4 rounded-lg grid grid-cols-2 gap-6 md:gap-4">
        <div className="flex flex-col gap-4">
          <Conditions
            icon={Thermometer}
            condition="Real Feel"
            value={realFeel}
            color={"text-red-500"}
          />
          <Conditions
            icon={Droplet}
            condition="Chance of rain"
            value={chanceOfRain}
            color={"text-blue-500"}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Conditions
            icon={Wind}
            condition="Wind"
            value={windSpeed}
            color={"text-blue-300"}
          />
          <Conditions
            icon={Sun}
            condition="UV Index"
            value={uv}
            color={"text-yellow-400"}
          />
        </div>
      </div>
    </article>
  );
}

function Conditions({ icon: Icon, condition, value, color }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className={`size-8 md:size-10 lg:size-6 ${color}`} />
      <div>
        <p className="text-lg md:text-xl lg:text-xs text-gray-100/80">
          {condition}
        </p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

Conditions.propTypes = {
  icon: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

AirConditions.propTypes = {
  weather: PropTypes.object.isRequired,
  weatherDetails: PropTypes.object.isRequired,
  uvIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
