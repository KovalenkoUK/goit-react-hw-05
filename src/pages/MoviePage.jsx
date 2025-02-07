import React, { useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
      headers: { Authorization: `Bearer api_read_access_token` }
    });
    setMovies(response.data.results);
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;