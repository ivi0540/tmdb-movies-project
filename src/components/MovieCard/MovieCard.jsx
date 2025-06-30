import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieById } from "../../api";

const MovieCard = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getMovieById(id).then((data) => {
      setMovie(data);
    });
  }, [id]);
  return (
    <div>
      <Link to={movie.homepage}>{movie.title}</Link>
    </div>
  );
};

export { MovieCard };
