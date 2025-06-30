import { useState, useEffect } from "react";
import { getNowPlayingMovies } from "../../api";

const TestAPI = () => {
  const [backdrop, setBackdrop] = useState([]);
  useEffect(() => {
    getNowPlayingMovies().then((data) => {
      setBackdrop(data.results[0].backdrop_path);
    });
  }, []);
  return (
    <img src={`https://image.tmdb.org/t/p/w1280${backdrop}`} alt="backdrop" />
  );
};

export { TestAPI };
