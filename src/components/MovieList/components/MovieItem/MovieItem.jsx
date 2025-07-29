import { Link } from "react-router-dom";
import "./style.scss";

const MovieItem = ({ id, title, release_date, genre_ids, poster_path }) => {
  const style = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w300${poster_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <Link to={`/movie/${id}`}>
      <div className="poster" style={style}>
        <div className="poster__info">
          <div>
            <b>{title}</b>
          </div>
          <div>{release_date}</div>
          {genre_ids.map((genreItem, genreId) => (
            <p key={genreId}>{genreItem}</p>
          ))}
        </div>
      </div>
      <div className="poster__title">
        <h4>{title}</h4>
      </div>
    </Link>
  );
};

export { MovieItem };
