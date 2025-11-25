import TMDBLogoImg from "./images/TMDB-logo.png";
import "./style.scss";

const TMDBLogo = () => {
  return (
    <div className="logo">
      <img
        className="logo-image"
        src={TMDBLogoImg}
        alt="The Movie Database Logo"
      />
    </div>
  );
};

export { TMDBLogo };
