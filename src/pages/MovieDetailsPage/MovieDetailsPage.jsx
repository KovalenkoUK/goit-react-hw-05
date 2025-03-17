import { useEffect, useState, useRef } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../api";
import BackButton from "../../components/BackButton/BackButton";

function MovieDetailsPage() {
    const { movieId } = useParams();
    const location = useLocation();
    const prevLocationRef = useRef(location?.state?.prevLocation ?? "/movies");
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        fetchMovieDetails(movieId)
            .then((data) => {
                if (isMounted) {
                    setMovie(data);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    setError(error.message);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });
        return () => {
            isMounted = false;
        };
    }, [movieId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return movie ? (
        <div>
            <BackButton prevLocation={prevLocationRef.current} />
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h1>{movie.title}</h1>
            <p>Score: {Math.round(movie.vote_average * 10)}%</p>
            <p>{movie.overview}</p>
            <ul>
                {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
            <div>
                <Link to="cast" className="button" state={{ prevLocation: location }}>Check actors</Link>
                <Link to="reviews" className="button" state={{ prevLocation: location }}>Check reviews</Link>
                <Outlet />
            </div>
        </div>
    ) : (
        <p>Not found</p>
    );
}

export default MovieDetailsPage;