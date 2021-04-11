import React from 'react';

import './styles.css';

const posterImgPath = 'https://image.tmdb.org/t/p/w154/';

/* Generated using genreFormatHelper.js
 * This would probably be better off somewhere else but I don't anticipate using this data anywhere else so I'm leaving it as is.
*/
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

export default function ResultCard(props) {
  const {
    title,
    poster_path,
    release_date,
    genre_ids,
    overview,
    vote_average
  } = props.movie;

  const genres = genre_ids.map(gid => genreMap[gid]).join(', ');
  
  return (
    <div className="resultCard">
      {poster_path ?
        <img src={posterImgPath + poster_path} alt='' />
        :
        <img src="/poster-placeholder.png" className="posterPlaceholder" alt='' />
      }
      <div className="cardDetails">
        <h4>{title}</h4>
        <div className="releaseRatingContainer">
          <span className="releaseDate">{release_date}</span>
          <span className="rating">{vote_average}/10</span>
        </div>
        <p className="genres">{genres}</p>
        <p className="movieOverview">{overview}</p>
      </div>
    </div>
  );
}