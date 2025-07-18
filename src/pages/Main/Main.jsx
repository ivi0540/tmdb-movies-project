import { Header } from "../../components/Header/Header";
import { LatestMovie } from "../../components/LatestMovie/LatestMovie";
import { Footer } from "../../components/Footer/Footer";
import "./style.scss";

const Main = () => {
  return (
    <>
      <Header />
      <LatestMovie />
      <Footer />
    </>
  );
};

export { Main };
