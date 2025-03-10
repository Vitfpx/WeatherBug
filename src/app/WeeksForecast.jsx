import PropTypes from "prop-types";

const getDayName = (index) => {
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const currentDay = new Date().getDay();

  const forecastDay = (currentDay * index) % 7;

  return daysOfWeek[forecastDay];
};

export default function WeeksForecast({ forecast }) {
  return (
    <aside className="h-full flex flex-col rounded-2xl bg-gray-300 not-md:px-0 p-7 space-y-4 text-gray-100/80">
      <div className="text-sm">
        <h2 className="not-md:text-lg not-md:text-center text-gray-100">
          7-DAY FORECAST
        </h2>
      </div>
      <div className="flex flex-col flex-1 px-3 h-auto justify-between space-y-2">
        {forecast.map((day, index) => (
          <DayForecast
            key={index}
            day={getDayName(index)}
            icon={day.day.condition.icon}
            weather={day.day.condition.text}
            initialDegrees={day.day.maxtemp_c.toFixed(0)}
            finalDegrees={day.day.mintemp_c.toFixed(0)}
          />
        ))}
      </div>
    </aside>
  );
}

function DayForecast({ day, icon, weather, initialDegrees, finalDegrees }) {
  return (
    <div className="flex items-center justify-between w-full bg-gray-400/20 p-3 px-4 text-gray-100 rounded-lg md:gap-12">
      <span className="not-lg:text-lg text-gray-100/65 w-auto text-center">
        {day}
      </span>
      <div className="flex items-center gap-2 min-w-[120px] max-w-[180px]md:max-w-[250px] lg:max-w-[180px]">
        <img src={icon} alt={weather} className="size-10" />
        <p className="text-[14px] md:text-xl lg:text-sm w-full">{weather}</p>
      </div>

      <div className="flex items-center gap-1 text-lg md:text-xl lg:text-lg font-medium">
        <p>{initialDegrees}</p>
        <span className="text-gray-100/65">/{finalDegrees}</span>
      </div>
    </div>
  );
}

WeeksForecast.propTypes = {
  forecast: PropTypes.array.isRequired,
};

DayForecast.propTypes = {
  day: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  weather: PropTypes.string.isRequired,
  initialDegrees: PropTypes.number.isRequired,
  finalDegrees: PropTypes.number.isRequired,
};
