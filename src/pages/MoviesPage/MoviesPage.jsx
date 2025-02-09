import { useState, useEffect } from "react";
import { searchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from 'react-router-dom';

function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateSearchParams = (key, value) => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set(key, value);
        setSearchParams(updatedParams);
    };

    useEffect(() => {
        if (!query) return;

        setIsLoading(true);
        setError(null);

        searchMovies(query)
            .then((data) => setMovies(data))
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false));
    }, [query, searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        updateSearchParams("q", query);
    };

    return (
        <>
            <form onSubmit={handleSearch}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                />
                <button type="submit">Search</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!isLoading && !error && <MovieList movies={movies} />}
        </>
    );
}

export default MoviesPage;