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

      <div className="footer__item">© {currentYear}</div>

      <Link
        to={"https://github.com/ivi0540"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="footer__wrapper">
          <img
            className="footer__GitHubLogo"
            src={GitHubLogo}
            alt="GitHub Profile"
          />
        </div>
      </Link>
    </footer>
  );
};

export { Footer };
