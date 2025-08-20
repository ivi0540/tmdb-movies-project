import { useEffect, useState } from "react";
import "./style.scss";

const SearchMovie = ({ searchMovie, setSearchMovie }) => {
  const [searchInputValue, setSearchInputValue] = useState(searchMovie || "");

  useEffect(() => {
    setSearchInputValue(searchMovie || "");
  }, [searchMovie]);

  const resetSearch = () => {
    setSearchInputValue("");
    setSearchMovie("");
  };

  const executeSearch = () => {
    if (searchInputValue.trim()) {
      setSearchMovie(searchInputValue);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  const handleInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  return (
    <div className="search-movie">
      <input
        type="search"
        value={searchInputValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterKeyPress}
        placeholder="Enter to search movie"
        // aria-label="Search movies"
      />
      {searchInputValue && <button onClick={resetSearch}>x</button>}
      <button
        className="search-movie__btn"
        disabled={!searchInputValue.trim()}
        onClick={executeSearch}
      >
        Search
      </button>
    </div>
  );
};

export { SearchMovie };
