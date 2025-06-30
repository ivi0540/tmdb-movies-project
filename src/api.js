import { API_URL, API_KEY } from "./config";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const getAllMovies = async () => {
  const errorMessage = 'Error in "src/api.js/api.js->getAllMovies"';
  try {
    const response = await fetch(`${API_URL}/discover/movie`, options);
    if (!response.ok) {
      throw new Error(`${errorMessage} ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`${errorMessage} ${error.message}`);
    throw error;
  }
};

const getNowPlayingMovies = async () => {
  const errorMessage = 'Error in "src/api.js/api.js->getNowPlayingMovies"';
  try {
    const response = await fetch(`${API_URL}/movie/now_playing`, options);
    if (!response.ok) {
      throw new Error(`${errorMessage} ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`${errorMessage} ${error.message}`);
    throw error;
  }
};

const getMovieById = async (id) => {
  const errorMessage = 'MyError in "src/api.js/api.js->getMovieById"';
  try {
    const response = await fetch(`${API_URL}/movie/${id}`, options);
    if (!response.ok) {
      throw new Error(`${errorMessage} ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`${errorMessage} ${error.message}`);
    throw error;
  }
};

const getMovieByTitle = async (title) => {
  const errorMessage = 'MyError in "src/api.js/api.js->getMovieByTitle';
  try {
    const response = await fetch(
      `${API_URL}/search/movie?query=${title}`,
      options
    );
    if (!response.ok) {
      throw new Error(`${errorMessage} ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`${errorMessage} ${error.message}`);
    throw error;
  }
};

export { getAllMovies, getMovieById, getMovieByTitle, getNowPlayingMovies };
