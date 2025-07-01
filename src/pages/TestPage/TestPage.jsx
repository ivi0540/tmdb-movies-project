import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { NewestMovie } from "../../components/NewestMovie/NewestMovie";
import "./style.scss";

const TestPage = () => {
  return (
    <>
      <Header />
      <NewestMovie />
      <Footer />
    </>
  );
};

export { TestPage };
