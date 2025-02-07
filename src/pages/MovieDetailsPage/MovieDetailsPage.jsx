import { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../api";
import BackButton from "../../components/BackButton/BackButton";

function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchMovieDetails(movieId).then(setMovie).then(() => setIsLoading(false));

    }, [movieId]);
    if (isLoading) {
        return <p>Loading...</p>
    }
    return movie ? (
        <div>
            <BackButton />
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <h1>{movie.title}</h1>
            <p>Score:{Math.round(movie.vote_average * 10)}%</p>
            <p>{movie.overview}</p>
            <ul>
                {
                    movie.genres.map(genre => (
                        <li key={genre.id}>{genre.name}</li>
                    ))
                }
            </ul>


            <div>
                <Link to={`cast`} className="button">Check actors</Link>
                <Link to={`reviews`} className="button">Check rewiews</Link>
                <Outlet />
            </div>
        </div>
    ) : (
            <p>Not found</p>
        );
}

export default MovieDetailsPage;
