'use strict';
const axios = require('axios');
let cache = require('./cache.js');

class Movie {
  constructor(movieFromSearch) {
    this.title = movieFromSearch.original_title;
    this.overview = movieFromSearch.overview;
    this.average_votes = movieFromSearch.vote_average;
    this.total_votes = movieFromSearch.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${movieFromSearch.poster_path}`;
    this.popularity = movieFromSearch.popularity;
    this.released_on = movieFromSearch.release_date;
  }
}

async function getMovie(request, response, next) {
  try {

    let keyword = request.query.keyword;
    const key = 'movie-' + keyword;

    let movieDataFromApi = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`);
    let sortMovieData = movieDataFromApi.data.results.map(i => new Movie(i)).slice(0,2);
  

    if (cache[key] && (Date.now() - cache[key].timestamp < 864000000)) {
      console.log('movie Cache hit');
    } else {
      console.log('movie Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = sortMovieData;
      response.send(sortMovieData);
    }

    response.send(cache[key].data);

  } catch (error) {
    next(error);
  }
}

module.exports = getMovie;
