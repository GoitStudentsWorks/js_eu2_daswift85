import axios from 'axios';

const MAIN_URL = 'https://api.themoviedb.org/3';
const API_KEY = '492f9e953404699f8c7d096022fa41fa';
const BASE_URL_TOP = `https://api.themoviedb.org/3/movie/top_rated`;

export async function getTopRatedMovie(page = 1) {
  const response = await axios.get(
    `${BASE_URL_TOP}?api_key=${API_KEY}&page=${page}`
  );
  return response.data;
}

export async function getMovieByTrend(type = 'day', page = 1) {
  const url = `${MAIN_URL}/trending/all/${type}?api_key=${API_KEY}&language=en-US&page=${page}`;
  return await axios
    .get(url)
    .then(response => {
      // console.log(response.data);
      return response.data;
    })
    .catch(error => console.log(error));
}

export async function getMovieByKeyword(query, page) {
  const url = `${MAIN_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

export async function getMovieInfo(movie_id) {
  const url = `${MAIN_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {});
}

export async function getMovieTrailer(movie_id) {
  const url = `${MAIN_URL}/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`;
  return await axios
    .get(url)
    .then(response => {
      return response.data.results;
    })
    .catch(error => {});
}

export async function getArrayOfMovies(array) {
  const arrayOfMovies = array.map(async movie_id => {
    return await axios
      .get(`${MAIN_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
  });

  const resultData = await Promise.all(arrayOfMovies);
  return resultData;
}
