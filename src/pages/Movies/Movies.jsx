import { Header } from "../../components/Header/Header";
import { MovieList } from "../../components/MovieList/MovieList";
import { Footer } from "../../components/Footer/Footer";
import "./style.scss";

const Movies = () => {
  return (
    <>
      <Header />
      <MovieList />
      <Footer />
    </>
  );
};

export { Movies };
