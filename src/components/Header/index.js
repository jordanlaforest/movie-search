import React from 'react';

import './styles.css';

export default function Header() {
  return (
    <header className="headerContainer">
      <h1 className="headingText">Movie Search</h1>
      <form name="Movie Search" className="searchForm">
        <input name="Movie Searchbar" type="search" placeholder="Search movies" className="searchInput" />
        <button name="Search Button" type="submit" className="searchButton">Search</button>
      </form>
    </header>
  );
}