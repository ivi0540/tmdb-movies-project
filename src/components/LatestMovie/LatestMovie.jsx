import { useState, useEffect } from "react";
import { getNowPlayingMovies } from "../../api";
import { Preloader } from "../Preloader/Preloader";
import { ErrorPreloader } from "../ErrorPreloader/ErrorPreloader";
import "./style.scss";

const LatestMovie = () => {
  const [newestMovie, setNewestMovie] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("loading"); // success | loading | error
  useEffect(() => {
    let isMounted = true; // флаг для отслеживания "живости" компонента
    const downloadData = async () => {
      try {
        const data = await getNowPlayingMovies();
        if (!isMounted) return; // аналог brake
        setNewestMovie(data);
        setFetchStatus("success");
      } catch (error) {
        if (!isMounted) return;
        console.error(error.message);
        setFetchStatus("error");
      }
    };
    downloadData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (fetchStatus === "error") {
    return <ErrorPreloader />;
  }

  if (fetchStatus === "loading") {
    return (
      <div>
        <Preloader />
      </div>
    );
  }

  const bannerStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${newestMovie.results[0].backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "black",
  };

  return (
    <div className="movie-banner" style={bannerStyle}>
      <div className="movie-banner__content">
        <h1 className="movie-banner__title">
          {newestMovie?.results[0]?.original_title}
        </h1>
        <div className="movie-banner__actions">
          <button className="movie-banner__btn">More about the film</button>
          <button className="movie-banner__btn">Watch trailer</button>
        </div>
      </div>
    </div>
  );
};

export { LatestMovie };
