import { getAllMovies, getMovieByTitle, getGenres } from "../../api";
import { useState, useEffect } from "react";
import { MovieItem } from "../MovieItem/MovieItem";
import { Preloader } from "../Preloader/Preloader";
import { ErrorPreloader } from "../ErrorPreloader/ErrorPreloader";
import { Paginate } from "./components/Paginate/Paginate";
import "./style.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [searchMovie, setSearchMovie] = useState("");
  const [genresMap, setGenresMap] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("loading"); // success | loading | error

  useEffect(() => {
    let isMounted = true;
    const fetchAllMovies = async () => {
      try {
        const data = searchMovie
          ? await getMovieByTitle(searchMovie, page)
          : await getAllMovies(page);
        const genresData = await getGenres();
        if (!isMounted) return;
        setMovies(data.results || []);
        setGenresMap(genresData);
        setPagination({
          page: data.page,
          total_pages: data.total_pages,
          total_results: data.total_results,
        });
        setFetchStatus("success");
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllMovies();
    return () => {
      isMounted = false;
    };
  }, [page, searchMovie, genresMap]);

  if (fetchStatus === "error") {
    return <ErrorPreloader />;
  }

  if (fetchStatus === "loading") {
    return <Preloader />;
  }

  return (
    <>
      <div className="card-container">
        {movies.length !== 0 ? (
          movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} genresMap={genresMap} />
          ))
        ) : (
          <p>movies not found</p>
        )}
      </div>
      <Paginate
        page={page}
        setPage={setPage}
        pagination={pagination}
        setPagination={setPagination}
        setFetchStatus={setFetchStatus}
      />
    </>
  );
};

export { MovieList };
