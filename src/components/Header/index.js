import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles.css';

import {fetchSearch} from '../../app/searchReducer';

export default function Header() {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState("");
  return (
    <header className="headerContainer">
      <h1 className="headingText">Movie Search</h1>
      <form name="Movie Search" className="searchForm">
        <input
          name="Movie Searchbar"
          type="search"
          placeholder="Search movies"
          className="searchInput"
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
        />
        <button
          name="Search Button"
          type="submit"
          className="searchButton"
          onClick={(e) => {
            e.preventDefault();
            dispatch(fetchSearch({query: inputState}));
          }}
        >
          Search
        </button>
      </form>
    </header>
  );
}