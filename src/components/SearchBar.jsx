import { useState, useRef } from "react";
import { Search } from "lucide-react";
import PropTypes from "prop-types";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      handleBlur();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      handleBlur();
    }
  };

  const handleBlur = () => {
    if (inputRef.current) inputRef.current.blur();
  };

  const inputRef = useRef(null);

  return (
    <article className="relative group w-[40rem]">
      <input
        type="text"
        className="focus:ring-2 pl-4 focus:ring-gray-100 bg-gray-300 text-white text-sm placeholder-gray-100/80 font-medium outline-none p-3 rounded-xl w-full"
        placeholder="Search for cities"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={onKeyDown}
        ref={inputRef}
      />
      <Search
        className="text-white absolute right-3 top-1/2 -translate-y-1/2 size-6 
       hidden group-focus-within:block cursor-pointer"
        onClick={handleSearch}
      />
    </article>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
