import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById, getMovieImages, getMovieVideos } from "../../api";
import { MovieImages } from "./components/MovieImages/MovieImages";
import { MovieVideos } from "./components/MovieVideos/MovieVideos";
import { MoviePosters } from "./components/MoviePosters/MoviePosters";
import { Preloader } from "../Preloader/Preloader";
import { ErrorPreloader } from "../ErrorPreloader/ErrorPreloader";
import { getDate } from "../../utils/dateUtils";
import { validateUrl } from "../../utils/validateUrl";
import "./style.scss";

const MovieCard = () => {
  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("loading"); // success | loading | error
  const [isLoadedPoster, setIsLoadedPoster] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true; //TODO: AboutController() более продвинутый способ прервать загрузку данных
    const fetchMovieData = async () => {
      try {
        const movieData = await getMovieById(id);
        if (!isMounted) return;
        setMovie(movieData);
        setFetchStatus("success");

        const imagesData = await getMovieImages(id);
        if (!isMounted) return;
        setImages(imagesData);

        const videosData = await getMovieVideos(id);
        if (!isMounted) return;
        setVideos(videosData);
      } catch (error) {
        if (!isMounted) return;
        setFetchStatus("error");
        console.error(error);
      }
    };
    fetchMovieData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (fetchStatus === "error") {
    return <ErrorPreloader />;
  }

  if (fetchStatus === "loading") {
    return <Preloader />;
  }

  if (fetchStatus === "success") {
    return (
      <>
        <div className="movieCard">
          <div
            className="movieCard__background-wrapper"
            style={{
              backgroundImage: movie?.backdrop_path
                ? `url(
                 https://image.tmdb.org/t/p/original${movie.backdrop_path}
               )`
                : "none",
            }}
          >
            <h1 className="movieCard__big-title">{movie.title}</h1>
            <div className="movieCard__content-container">
              <div className="movieCard__poster-container">
                <img
                  className={`movieCard__poster ${
                    isLoadedPoster ? "poster--loaded" : ""
                  }`}
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                  onLoad={() => setIsLoadedPoster(true)}
                />
              </div>

              <div className="movieCard__date_container">
                <div>Title: </div>
                <div className="movieCard__title">{movie.title}</div>
                <div>Tagline: </div>
                <div className="movieCard__tagline">{movie.tagline}</div>
                <div>Release date: </div>
                <div>{getDate(movie.release_date)}</div>
                <div>Vote average: </div>
                <div>{Number(movie.vote_average).toFixed(2)} / 10</div>
                <div>Vote count: </div>
                <div>{movie.vote_count}</div>
                <div>Runtime: </div>
                <div>{movie.runtime} minutes</div>
                <div>Countries: </div>
                <div className="movieCard__countries">
                  {movie?.production_countries?.length > 0 ? (
                    movie.production_countries.map((item, index) => (
                      <div key={index}>{item.name}</div>
                    ))
                  ) : (
                    <div>No Countries</div>
                  )}
                </div>
                <div>Companies: </div>
                <div className="movieCard__companies">
                  {movie?.production_companies?.length > 0 ? (
                    movie.production_companies.map((item, index) => (
                      <div key={index}>
                        {item?.logo_path ? (
                          <img
                            className="movieCard__logoToCompanies"
                            src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                            alt={`${item.name} logo`}
                            title={`${item.name}`}
                          />
                        ) : (
                          <div>{item.name}</div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div>No Companies</div>
                  )}
                </div>
                <div>Genres: </div>
                <div className="movieCard__genres">
                  {movie?.genres?.length > 0 ? (
                    movie.genres.map((item, index) => (
                      <div key={index}>{item.name}</div>
                    ))
                  ) : (
                    <div>No Genres</div>
                  )}
                </div>
                <div> Link to homepage: </div>
                {validateUrl(movie.homepage) ? (
                  <div>
                    <Link
                      to={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>Official Website</strong>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <strong>The site is unavailable</strong>
                  </div>
                )}
                <div>Overview: </div>
                <div className="movieCard__overview">{movie.overview}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="media-container">
          <MovieImages images={images} />
          <MoviePosters images={images} />
          <MovieVideos videos={videos} />
        </div>
      </>
    );
  }

  return null;
};

export { MovieCard };
