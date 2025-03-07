// import { Cloud, CloudSun, Sun } from "lucide-react";
import PropTypes from "prop-types";

export default function TodaysForecast({ forecast, icon }) {
  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <article className="space-y-4 rounded-2xl bg-gray-300 p-5 px-8 text-xs font-bold text-white">
      <h2 className="text-gray-100">TODAYS FORECAST</h2>
      <ul className="flex justify-center gap-14 overflow-hidden">
        {forecast.map((info, index) => (
          <Forecast
            key={index}
            hour={info.dt_txt}
            icon={icon[index]}
            degrees={info.main.temp}
            formatTime={formatTime}
          />
        ))}
      </ul>
    </article>
  );
}

function Forecast({ hour, icon: Icon, degrees, formatTime }) {
  // const IconComponent = typeof Icon === "string" ? null : Icon;
  return (
    <li className="relative flex flex-col justify-center text-center items-center gap-2 after:absolute after:top-0 after:bottom-0 after:left-[-1.75rem] after:w-[2px] after:bg-gray-100/30 after:content-['']">
      {/* Remove a linha do primeiro item */}
      {hour === 0 && (
        <style>{`li:first-child::after { display: none; }`}</style>
      )}

      <p className="font-bold whitespace-nowrap text-white/80">
        {formatTime(hour)}
      </p>
      <Icon className="size-12" />
      <span className="text-2xl text-white/80">
        {Math.round(degrees) + "º"}
      </span>
    </li>
  );
}

Forecast.propTypes = {
  hour: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  degrees: PropTypes.number.isRequired,
  formatTime: PropTypes.func.isRequired,
};

TodaysForecast.propTypes = {
  icon: PropTypes.arrayOf(PropTypes.string).isRequired,
  forecast: PropTypes.array.isRequired,
};
