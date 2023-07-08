export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbSearchEndpoint = "https://api.themoviedb.org/3/search/movie";
// const keyAPI = process.env.REACT_APP_API_KEY;
const keyAPI = "d64fc6923e69c12a1565bcbe58d01d30";

export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}/?api_key=${keyAPI}&page=${page}`,
  getMovieSearch: (query, page) =>
    `${tmdbSearchEndpoint}?api_key=${keyAPI}&query=${query}&page=${page}`,
  getMovieDetail: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${keyAPI}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${keyAPI}`,
  getImg: (path, size = "original") =>
    `https://image.tmdb.org/t/p/${size}${path}`,
};
