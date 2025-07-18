import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const MovieItem = (props) => {
  const { id, title, release_date } = props;
  const style = props
    ? {
        backgroundImage: `url(https://image.tmdb.org/t/p/w300${props.poster_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {
        backgroundColor: "red",
      };
  useEffect((props) => {
    console.log(props);
  }, []);
  return (
    <Link to={`/movie/${id}`}>
      <div className="card background" style={style}>
        <div>
          <b>{title}</b>
        </div>
        <div>{release_date}</div>
      </div>
    </Link>
  );
};

export { MovieItem };
