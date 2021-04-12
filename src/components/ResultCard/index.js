import React from 'react';

import './styles.css';

const posterImgPath = 'https://image.tmdb.org/t/p/w154';

export default function ResultCard(props) {
  const {
    title,
    poster_path,
    release_date,
    genres,
    overview,
    vote_average
  } = props.movie;

  
  return (
    <div className="resultCard" role="listitem" aria-posinset={props.idx} aria-setsize="-1">
      {poster_path ?
        <img src={posterImgPath + poster_path} alt='' />
        :
        <img src="/poster-placeholder.png" className="posterPlaceholder" alt="" />
      }
      <div className="cardDetails">
        <h2>{title}</h2>
        <div className="releaseRatingContainer">
          <span className="releaseDate">{release_date}</span>
          <span className="rating">{vote_average}/10</span>
        </div>
        <p className="genres">{genres}</p>
        <p className="movieOverview" tabIndex="0">{overview}</p>
      </div>
    </div>
  );
}