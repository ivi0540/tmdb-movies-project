import { useState, useEffect } from "react";
import "./style.scss";
import GitHubLogo from "./images/github.png";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { getNowPlayingMovies } from "../../api";

const TestPage = () => {
  const [newestMovie, setNewestMovie] = useState(null);

  const currentYear = new Date().getFullYear();
  const back = newestMovie?.results[0]?.backdrop_path
    ? {
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${newestMovie.results[0].backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {
        backgroundColor: "red",
      };

  useEffect(() => {
    getNowPlayingMovies().then((data) => setNewestMovie(data));
  }, []);
  return (
    <>
      <Header />

      <main className="main" style={back}></main>

      <footer className="footer">
        <Link
          to={
            "https://developer.themoviedb.org/reference/intro/getting-started"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <img
            className="header__logo"
            src={TMDBLogo}
            alt="The Movie Database Logo"
          /> */}
        </Link>

        <div className="footer__item">© {currentYear}</div>

        <Link
          to={"https://github.com/ivi0540"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="header__logo" src={GitHubLogo} alt="GitHub Profile" />
        </Link>
      </footer>
    </>
  );
};

export { TestPage };
