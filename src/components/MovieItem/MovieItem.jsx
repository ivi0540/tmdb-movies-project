import { Link } from "react-router-dom";
import { getDate } from "../../utils/dateUtils";
import { getGenreNames } from "../../utils/getGenreNames";
import "./style.scss";

const MovieItem = ({
  id,
  release_date,
  genre_ids,
  title,
  poster_path,
  genresMap = [],
}) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className="card">
        <div
          className="card__poster"
          style={{
            backgroundImage: poster_path
              ? `url(https://image.tmdb.org/t/p/w500${poster_path})`
              : "none",
          }}
        >
          <div className="card__info">
            <div>{title}</div>
            <div>{getDate(release_date)}</div>
            <div>
              {getGenreNames(genresMap, genre_ids).map((item, index) => (
                <p key={`${item}-${index}`}>{item}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="card__title">{title}</div>
      </div>
    </Link>
  );
};

export { MovieItem };
