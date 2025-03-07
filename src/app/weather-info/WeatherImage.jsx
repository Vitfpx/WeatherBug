import PropTypes from "prop-types";
import { weatherIcons } from "../mockWeatherIcons";

export default function WeatherImage({ weatherData }) {
  if (!weatherData) return <p>Carregando...</p>;

  const condition = weatherData.weather[0].main;
  const IconSrc = weatherIcons[condition] || "/icons/default.png";

  return (
    <div className="flex flex-col items-start pr-8">
      {IconSrc && <IconSrc className="size-35" />}
      {/* <img src={iconSrc} alt={condition} className="w-16 h-16" /> */}
      {/* <p className="w-16 h-16">{iconSrc}</p> */}
      {/* <img src={iconSrc} className="size-35" /> */}
      {/* <p>{iconSrc}</p> */}
      {/* <p className="text-lg font-semibold">{condition}</p> */}
      {/* <p className="text-lg">{weatherData.weather[0].description}</p> */}
    </div>
  );
}

WeatherImage.propTypes = {
  weatherData: PropTypes.array.isRequired,
};
