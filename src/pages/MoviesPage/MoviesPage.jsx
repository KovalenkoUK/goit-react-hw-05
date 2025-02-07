import { useState, useEffect } from "react";
import { searchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from 'react-router-dom';


function MoviesPage() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);




    const updateSearchParams = (key, value) => {

        const updatedParams = new URLSearchParams(searchParams);


        updatedParams.set(key, value);


        setSearchParams(updatedParams);
    };
    useEffect(() => {
        setIsLoading(true);
        searchMovies(query).then(setMovies).then(()=>{ setIsLoading(false)});
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);
        searchMovies(query).then(setMovies).then(() => { setIsLoading(false) });

        updateSearchParams("q", query);
    };



    return (
        <>
            <form onSubmit={handleSearch}>
                <input value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <MovieList movies={movies} isLoading={isLoading}/>
        </>
    );
}

export default MoviesPage;
