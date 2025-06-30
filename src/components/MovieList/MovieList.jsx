import { getAllMovies, getMovieByTitle } from "../../api";
import { useState, useEffect } from "react";
import { MovieItem } from "../MovieItem/MovieItem";
import "./style.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const searchMovie = null; //!!!!!!!

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        if (searchMovie) {
          const data = await getMovieByTitle(searchMovie);
          setMovies(data.results || []);
        } else {
          const data = await getAllMovies();
          setMovies(data.results || []);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllMovies();
  }, []);

  return (
    <>
      <div className="card-container">
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
};

export { MovieList };
