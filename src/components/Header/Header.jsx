import { Link } from "react-router-dom";
import { TMDBLogo } from "../../components/TMDBLogo/TMDBLogo";
import "./style.scss"

const Header = () => {
  const menu = [
    { path: "/movie", label: "Movie" },
    { path: "/", label: "Link2" },
    { path: "/", label: "Link3" },
    { path: "/", label: "Link4" },
  ];
  return (
    <header className="header">
      <div className="header__nav">
        <Link
          to={
            "https://developer.themoviedb.org/reference/intro/getting-started"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <TMDBLogo />
        </Link>
        {menu.map((menuItem, index) => (
          <div key={index} className="header__nav-item">
            <Link to={menuItem.path}>{menuItem.label}</Link>
          </div>
        ))}
      </div>
    </header>
  );
};

export { Header };
