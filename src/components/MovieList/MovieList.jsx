import { getAllMovies, getMovieByTitle } from "../../api";
import { useState, useEffect } from "react";
import { MovieItem } from "./components/MovieItem/MovieItem";
import { Paginate } from "./components/Paginate/Paginate";
import { SearchMovie } from "./components/SearchMovie/SearchMovie";
import { Preloader } from "../Preloader/Preloader";
import { ErrorPreloader } from "../ErrorPreloader/ErrorPreloader";
import "./style.scss";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [searchMovie, setSearchMovie] = useState("");
  const [fetchStatus, setFetchStatus] = useState("loading"); // success | loading | error

  useEffect(() => {
    let isMounted = true;
    const fetchAllMovies = async () => {
      try {
        const data = searchMovie
          ? await getMovieByTitle(searchMovie, page)
          : await getAllMovies(page);
        if (!isMounted) return;
        setMovies(data.results || []);
        setPagination({
          page: data.page,
          total_pages: data.total_pages,
          total_results: data.total_results,
        });
        setFetchStatus("success");
      } catch (error) {
        if (!isMounted) return;
        console.error(error);
        setFetchStatus("error");
      }
    };
    fetchAllMovies();
    return () => {
      isMounted = false;
    };
  }, [page, searchMovie]);

  if (fetchStatus === "error") {
    return <ErrorPreloader />;
  }

  if (fetchStatus === "loading") {
    return <Preloader />;
  }

  return (
    <>
      <SearchMovie searchMovie={searchMovie} setSearchMovie={setSearchMovie} />
      <Paginate
        page={page}
        setPage={setPage}
        pagination={pagination}
        setPagination={setPagination}
        setFetchStatus={setFetchStatus}
      />
      <div className="card-container">
        {movies.length !== 0 ? (
          movies.map((movie) => <MovieItem key={movie.id} {...movie} />)
        ) : (
          <p>movies not found</p>
        )}
      </div>
    </>
  );
};

export { MovieList };
