import { Link, useLocation } from "react-router-dom";


function MovieList({ movies, isLoading }) {
    const location = useLocation();
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <>
            {

                movies.length > 0 ? (<ul >
                    {movies.map(({ id, title }) => (
                        <li key={id}>
                            <Link state={{
                                prevLocation: location.pathname + location.search,
                            }} to={
                                `/movies/${id}`
                            } >{title}</Link>
                        </li>
                    ))}
                </ul>) : <p>No movies</p>
            }
        </>
    );

}

export default MovieList;
