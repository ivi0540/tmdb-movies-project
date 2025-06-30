import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { getNowPlayingMovies } from "../../api";
import "./style.scss";

const TestPage = () => {
  const [newestMovie, setNewestMovie] = useState(null);
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
      <Footer />
    </>
  );
};

export { TestPage };
