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
    getNowPlayingMovies().then((data) => {
      setNewestMovie(data);
      console.log(data);
    });
  }, []);
  return (
    <div className="background" style={style}>
      <div className="background__cont1">
        <label className="background__title">
          {newestMovie?.results[0]?.original_title}
        </label>

        <div className="background__cont2">
          <button className="background__btn">More about the film</button>
          <button className="background__btn">Watch trailer</button>
        </div>
      </div>
    </div>
  );
};

export { NewestMovie };
