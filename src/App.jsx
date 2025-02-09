import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from 'react';

const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./components/MovieReviews/MovieReviews"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
import Navigation from "./components/Navigation/Navigation";
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));

function App() {
    return (
        <>
            <Navigation />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:movieId" element={<MovieDetailsPage />} >
                        <Route path="cast" element={<MovieCast />} />
                        <Route path="reviews" element={<MovieReviews />} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    );
}

export default App;