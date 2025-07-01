import { useState, useEffect } from "react";
import { getNowPlayingMovies } from "../../api";
import "./style.scss";

const NewestMovie = () => {
  const [newestMovie, setNewestMovie] = useState(null);
  const style = newestMovie?.results[0]?.backdrop_path
    ? {
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${newestMovie.results[0].backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {
        backgroundColor: "red",
      };
  useEffect(() => {
    getNowPlayingMovies().then((data) => setNewestMovie(data));
  }, []);
  return <div className="background" style={style}></div>;
};

export { NewestMovie };
