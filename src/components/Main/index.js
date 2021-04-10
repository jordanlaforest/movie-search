import React from 'react';
import { useSelector } from 'react-redux';

import './styles.css';

import {selectSearchResults} from '../../app/searchReducer';

const pleaseSearch = <p>Type a search in the field above</p>;
const noResults = <p>No results found. Please try again.</p>;

export default function Main() {
  const results = useSelector(selectSearchResults);
  
	return (
		<main className="mainContent">
			{!results
        ?
				  pleaseSearch
				:
			    <ul>
            {results.map(movie => 
              <li>{movie.title}</li>
            )}
          </ul>
      }
		</main>
	);
}