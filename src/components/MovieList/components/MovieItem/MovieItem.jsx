import { Link } from "react-router-dom";
import { getDate } from "../../../../utils/dateUtils";
import "./style.scss";

const MovieItem = ({
  id,
  title,
  release_date,
  genre_ids,
  genresMap,
  poster_path,
}) => {
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
          <div>{getDate(release_date)}</div>
          <div>
            {genre_ids.map((genreId) => (
              <p key={genreId}>
                {genresMap.find((item) => item.id === genreId)?.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="poster__title">
        <h4>{title}</h4>
      </div>
    </Link>
  );
};

export { MovieItem };
