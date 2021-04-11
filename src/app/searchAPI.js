import axios from 'axios';

const url = 'https://api.themoviedb.org/3/search/movie';

// Generated using genreFormatHelper.js
const genreMap = {
  '12': 'Adventure',
  '14': 'Fantasy',
  '16': 'Animation',
  '18': 'Drama',
  '27': 'Horror',
  '28': 'Action',
  '35': 'Comedy',
  '36': 'History',
  '37': 'Western',
  '53': 'Thriller',
  '80': 'Crime',
  '99': 'Documentary',
  '878': 'Science Fiction',
  '9648': 'Mystery',
  '10402': 'Music',
  '10749': 'Romance',
  '10751': 'Family',
  '10752': 'War',
  '10770': 'TV Movie'
};

export function searchAPIRequest(searchString, page) {
  return new Promise((resolve, reject) =>
    axios.get(url, {
      params: {
        api_key: 'd5bf0d62db7cc13fd854ff840dd47ff1',
        query: searchString,
        page: page
      }
    })
    .then((response) => {
      console.log('Get request succeeded');
      console.log(response.data);

      //Here we only store the relevant data while converting genre ids to human readable genres
      const results = response.data.results.map((res) => {
        return {
          title: res.title,
          poster_path: res.poster_path,
          release_date: res.release_date,
          genres: res.genre_ids.map(gid => genreMap[gid]).join(', '),
          overview: res.overview,
          vote_average: res.vote_average
        };
      })
      resolve({
        page: response.data.page,
        total_pages: response.data.total_pages,
        results: results
      });
    }).catch((error) => {
      console.log('Get request failed');
      console.log(error);
      reject(error);
    })
  );
}
