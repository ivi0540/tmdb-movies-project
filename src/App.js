import { MovieList } from "./components/MovieList/MovieList";
import { MovieCard } from "./components/MovieCard/MovieCard";
import { TestPage } from "./pages/TestPage/TestPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/movie" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieCard />} />
      </Routes>
    </Router>
  );
}

export default App;
