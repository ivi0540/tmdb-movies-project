import { getAllMovies, getMovieByTitle } from "../../api";
import { useState, useEffect } from "react";
import { MovieItem } from "./components/MovieItem/MovieItem";
import "./style.scss";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const searchMovie = null; //!!!!!!!

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        if (searchMovie) {
          const data = await getMovieByTitle(searchMovie);
          setMovies(data.results || []);
        } else {
          const data = await getAllMovies(page);
          setMovies(data.results || []);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllMovies();
  }, [page]);

  return (
    <>
      <div className="paginate">
        <button className="paginate__btn-pre" onClick={() => setPage(page - 1)}>
          PRE
        </button>
        <button
          className="paginate__btn-next"
          onClick={() => setPage(page + 1)}
        >
          NEXT
        </button>
      </div>
      <div className="card-container">
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
};

export { MovieList };
