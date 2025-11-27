import { useState, useEffect } from "react";
import "./style.scss";

const MovieFinder = ({ searchMovie, setSearchMovie, page, setPage }) => {
  const [query, setQuery] = useState(searchMovie);

  const startSearch = () => {
    if (query.length > 0) {
      if (page !== 1) {
        setPage(1);
      }
      setSearchMovie(query);
    }
  };

  const stopSearch = () => {
    if (page !== 1) {
      setPage(1);
    }
    setSearchMovie("");
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyEnterPress = (e) => {
    if (e.key === "Enter") {
      startSearch();
    }
  };

  useEffect(() => {
    setQuery(searchMovie);
  }, [searchMovie]);

  return (
    <div className="movie-finder">
      <input
        type="text"
        placeholder="Enter movie name..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyEnterPress}
      />
      <button onClick={stopSearch}>Х</button>
      <button onClick={startSearch}>Search</button>
    </div>
  );
};

export { MovieFinder };
