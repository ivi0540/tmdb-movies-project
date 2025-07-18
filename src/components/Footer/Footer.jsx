import "./style.scss";
import { Link } from "react-router-dom";
import { TMDBLogo } from "../../components/TMDBLogo/TMDBLogo";
import GitHubLogo from "./images/github.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <Link
        to={"https://developer.themoviedb.org/reference/intro/getting-started"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TMDBLogo />
      </Link>

      <div className="footer__item" aria-label="Текущий год: {currentYear}">
        © {currentYear}
      </div>

      <Link
        to="https://github.com/ivi0540"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="footer__GitHubLogo"
          src={GitHubLogo}
          alt="GitHub Profile"
        />
      </Link>
    </footer>
  );
};

export { Footer };
