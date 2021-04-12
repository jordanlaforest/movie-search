import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Polyfill for IE 11
import IntersectionObserver from 'intersection-observer-polyfill';

import './styles.css';

import ResultCard from '../ResultCard';
import {selectSearchResults,
  selectStatus,
  selectNoMorePages,
  selectNotSearched,
  selectFilter,
  fetchNextPage
} from '../../app/searchReducer';

const pleaseSearch = <p className="contentMsg">Type a search in the field above</p>;
const noResults = <p className="contentMsg">No results found. Please try again.</p>;

export default function Main() {
  const results = useSelector(selectSearchResults);
  const status = useSelector(selectStatus);
  const notSearched = useSelector(selectNotSearched);
  const noMorePages = useSelector(selectNoMorePages);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();
  const ref = useRef();

  const noMorePagesDiv = noMorePages && !notSearched && results.length !== 0 ? '' : 'infiniteScroll';

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
          status === 'loading' ? null : notSearched ? pleaseSearch : noResults
				:
          <div className="cardContainer">
            {results.filter(movie => movie.genres.toLowerCase().indexOf(filter) > -1 || movie.overview.toLowerCase().indexOf(filter) > -1).map((movie, index) => 
              <ResultCard key={index} movie={movie} />
            )}
          </div>
      }
      <div className={noMorePagesDiv} ref={ref}><p className="contentMsg">No more results to load</p></div>
      {status === 'loading' ? <p className="contentMsg">Loading results...</p> : null}
		</main>
	);
}