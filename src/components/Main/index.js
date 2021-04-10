import React from 'react';
import { useSelector } from 'react-redux';

import './styles.css';

import ResultCard from '../ResultCard';
import {selectSearchResults} from '../../app/searchReducer';

const pleaseSearch = <p>Type a search in the field above</p>;
const noResults = <p>No results found. Please try again.</p>;

export default function Main() {
  const results = useSelector(selectSearchResults);
  
	return (
		<main className="mainContent">
			{!results || results.length === 0
        ?
				  results ? noResults : pleaseSearch
				:
          <div className="cardContainer">
            {results.map(movie => 
              <ResultCard movie={movie} />
            )}
          </div>
      }
		</main>
	);
}