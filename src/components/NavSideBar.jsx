import PropTypes from "prop-types";
import windIcon from "../assets/wind-icon.png";
import { CloudSun, Map, Settings2, TablePropertiesIcon } from "lucide-react";

export default function NavSideBar() {
  return (
    <article className="flex flex-col items-center gap-12 bg-gray-300 rounded-2xl p-4">
      <div className="bg-gray-200 rounded-2xl w-12">
        <img className="w-[42px] h-[44px]" src={windIcon} alt="Wind icon" />
      </div>
      <div>
        <ul className="flex flex-col items-center gap-8">
          <NavItem label="Weather" icon={CloudSun} active />
          <NavItem label="Cities" icon={TablePropertiesIcon} />
          <NavItem label="Map" icon={Map} />
          <NavItem label="Settings" icon={Settings2} />
        </ul>
      </div>
    </article>
  );
}

function NavItem({ label, icon: Icon, active }) {
  return (
    <li
      className={`cursor-pointer align-center flex flex-col items-center gap-1.5 transition duration-200 hover:text-white 
        ${active ? "text-white" : "text-gray-100/60"}`}
    >
      <Icon className="size-5" />
      <span className="font-semibold text-xs">{label}</span>
    </li>
  );
}

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
