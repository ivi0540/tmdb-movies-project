// import { MovieList } from "./components/MovieList/MovieList";
import { MoviesPage } from "./pages/MoviesPage/MoviesPage";
import { MovieCard } from "./components/MovieCard/MovieCard";
import { MainPage } from "./pages/MainPage/MainPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieCard />} />
      </Routes>
    </Router>
  );
}

export default App;
