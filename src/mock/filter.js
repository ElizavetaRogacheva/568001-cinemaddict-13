const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.inWatchlist).length,
  history: (films) => films.filter((film) => film.inHistory).length,
  favorites: (films) => films.filter((film) => film.inFavorites).length
};


export const generateFilter = (filters) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(filters),
    };
  });
};
