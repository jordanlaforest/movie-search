import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './styles.css';

import ResultCard from '../ResultCard';
import {selectSearchResults, selectStatus, selectNoMorePages, selectNotSearched, fetchNextPage} from '../../app/searchReducer';

const pleaseSearch = <p>Type a search in the field above</p>;
const noResults = <p>No results found. Please try again.</p>;

export default function Main() {
  const results = useSelector(selectSearchResults);
  const status = useSelector(selectStatus);
  const notSearched = useSelector(selectNotSearched);
  const noMorePages = useSelector(selectNoMorePages);

  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && !notSearched && !noMorePages){
        dispatch(fetchNextPage());
      }
    }, {threshold: 0.9});
    const currentRef = ref.current;
    if(currentRef) observer.observe(currentRef);
    return () => {
      if(currentRef) observer.unobserve(currentRef);
    };
  }, [ref, results, notSearched, noMorePages, dispatch]);
  
	return (
		<main className="mainContent">
			{results.length === 0
        ?
				  notSearched ? pleaseSearch : noResults
				:
          <div className="cardContainer">
            {results.map((movie, index) => 
              <ResultCard key={index} movie={movie} />
            )}
          </div>
      }
      <div className="infiniteScroll" ref={ref}>No more results to load</div>
      {status === 'loading' ? <div className="loading">Loading results...</div> : null}
		</main>
	);
}