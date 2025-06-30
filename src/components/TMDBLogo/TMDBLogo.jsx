import TMDBLogoImg from "./images/TMDB-logo.png";
import "./style.scss";

const TMDBLogo = () => {
  return (
    <img className="logo" src={TMDBLogoImg} alt="The Movie Database Logo" />
  );
};

export { TMDBLogo };
