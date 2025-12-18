import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { MovieList } from "../../components/MovieList/MovieList";
import "./style.scss";

const MoviesPage = () => {
  return (
    <>
      <Header />
      <MovieList />
      <Footer />
    </>
  );
};

export { MoviesPage };
