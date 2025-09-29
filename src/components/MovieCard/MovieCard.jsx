import { useState, useEffect } from "react";
import { getMovieById, getMovieImages, getMovieVideos } from "../../api";
import { Link, useParams } from "react-router-dom";
import { MovieImages } from "./components/MovieImages/MovieImages";
import { MovieVideos } from "./components/MovieVideos/MovieVideos";
import { MoviePosters } from "./components/MoviePosters/MoviePosters";

const MovieCard = () => {
  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("loading"); // success | loading | error
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    const fetchMovieData = async () => {
      try {
        const movieData = await getMovieById(id);
        const imagesData = await getMovieImages(id);
        const videosData = await getMovieVideos(id);
        if (!isMounted) return;
        setMovie(movieData);
        setFetchStatus("success");
        setImages(imagesData);
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

  if (fetchStatus === "success") {
    return (
      <div>
        <img
          style={{ width: "100%" }}
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
        />
        <Link to={movie.homepage}>{movie.title}</Link>
        <h2>{movie.title}</h2>
        <h3>{movie.overview}</h3>
        <h3>{movie.popularity}</h3>
        <h3>{movie.release_date}</h3>
        <h3>{movie.tagline}</h3>
        <div>
          {movie.genres.map((item, index) => {
            return <p key={index}>{item.name}</p>;
          })}
        </div>

        <MovieImages images={images} />
        <MoviePosters images={images} />
        <MovieVideos videos={videos} />
      </div>
    );
  }
};

export { MovieCard };
