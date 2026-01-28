import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { NewMoviesSlider } from "../../components/NewMoviesSlider/NewMoviesSlider";
import "./style.scss";

const MainPage = () => {
  return (
    <>
      <Header />
      <NewMoviesSlider />
      <Footer />
    </>
  );
};

export { MainPage };
