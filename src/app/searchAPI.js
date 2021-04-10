import axios from 'axios';

const url = 'https://api.themoviedb.org/3/search/movie';

// A mock function to mimic making an async request for data
export function searchAPIRequest(searchString) {
  return new Promise((resolve, reject) =>
    axios.get(url, {
      params: {
        api_key: 'd5bf0d62db7cc13fd854ff840dd47ff1',
        query: searchString
      }
    })
    .then((response) => {
      console.log('Get request succeeded');
      console.log(response.data);
      resolve(response);
    }).catch((error) => {
      console.log('Get request failed');
      console.log(error);
      reject(error);
    })
    //setTimeout(() => resolve({ data: amount }), 500)
  );
}
