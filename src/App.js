import { Main } from "./pages/Main/Main";
import { Movies } from "./pages/Movies/Movies";
// import { MovieList } from "./components/MovieList/MovieList";
import { MovieCard } from "./components/MovieCard/MovieCard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieCard />} />
        {/* <Route path="/test" element={<Main />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
