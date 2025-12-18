import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
// import { NewestMovie } from "../../components/NewestMovie/NewestMovie";
import { NewMoviesSlider } from "../../components/NewMoviesSlider/NewMoviesSlider";
import "./style.scss";

const MainPage = () => {
  return (
    <>
      <Header />
      {/* <NewestMovie /> */}
      <NewMoviesSlider />
      <Footer />
    </>
  );
};

export { MainPage };
