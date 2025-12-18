const getGenreNames = (allGenres = [], GenresId = []) => {
  if (!allGenres.length || !GenresId.length) {
    return [];
  }
  return allGenres
    .filter((genre) => GenresId.includes(genre.id))
    .map((item) => item.name);
};

export { getGenreNames };
