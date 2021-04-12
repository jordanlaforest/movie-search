import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

  const showNoMorePagesMsg = noMorePages && !notSearched && results.length !== 0;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && !notSearched && !noMorePages){
        dispatch(fetchNextPage());
      }
    }, {threshold: 0.1});
    const currentRef = ref.current;
    if(currentRef) observer.observe(currentRef);
    return () => {
      if(currentRef) observer.unobserve(currentRef);
    };
  }, [ref, results, notSearched, noMorePages, dispatch]);

	return (
		<main id="mainScrollable" className="mainContent" tabIndex="0" aria-live="polite">
			{results.length === 0
        ?
          status === 'loading' ? null : notSearched ? pleaseSearch : noResults
				:
          <div className="cardContainer" role="list">
            {results.filter(movie => movie.genres.toLowerCase().indexOf(filter) > -1 || movie.overview.toLowerCase().indexOf(filter) > -1).map((movie, index) => 
              <ResultCard key={movie.id} idx={index+1} movie={movie} />
            )}
          </div>
      }
      <div className={showNoMorePagesMsg ? '' : 'infiniteScroll'} ref={ref} aria-hidden={!showNoMorePagesMsg}><p className="contentMsg">No more results to load</p></div>
      {status === 'loading' ? <p className="contentMsg">Loading results...</p> : null}
		</main>
	);
}