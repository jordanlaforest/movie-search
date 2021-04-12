import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles.css';

import {fetchSearch, refineSearch} from '../../app/searchReducer';

export default function Header() {
  const dispatch = useDispatch();
  const [searchState, setSearchState] = useState('');
  const [refineState, setRefineState] = useState('');

  return (
    <header className="headerContainer">
      <h1 className="headingText">Movie Search</h1>
      <div className="inputContainer">
        <form name="Movie Search" className="searchForm">
          <input
            name="Movie Searchbar"
            type="search"
            placeholder="Search movies"
            className="searchInput"
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
          />
          <button
            name="Search Button"
            type="submit"
            className="searchButton"
            onClick={(e) => {
              e.preventDefault();
              dispatch(fetchSearch({query: searchState}));
            }}
          >Search</button>
        </form>
        <form name="Refine Search" className="searchForm">
          <input
            name="Refine Input"
            type="search"
            placeholder="Refine search"
            className="searchInput"
            value={refineState}
            onChange={(e) => setRefineState(e.target.value)}
          />
          <button
            name="Refine Button"
            type="submit"
            className="searchButton"
            onClick={(e) => {
              e.preventDefault();
              dispatch(refineSearch({query: refineState}));
            }}
          >Refine</button>
        </form>
      </div>

    </header>
  );
}