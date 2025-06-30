import "./style.css";
import { Link } from "react-router-dom";

const MovieItem = ({ id, overview, release_date, title }) => {
  return (
    <Link to={`/movie/${id}`} className="card">
      <div>{id}</div>
      <div>
        <b>{title}</b>
      </div>
      <div>{overview}</div>
      <div>{release_date}</div>
    </Link>
  );
};

export { MovieItem };
