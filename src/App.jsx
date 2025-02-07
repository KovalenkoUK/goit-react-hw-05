import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

const HomePage = lazy(() => import('./HomePage.jsx'));
const MoviesPage = lazy(() => import('./MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('./MovieDetailsPage.jsx'));
const NotFoundPage = lazy(() => import('./NotFoundPage.jsx'));
const MovieReviews = lazy(() => import('./MovieReviews.jsx'));
const MovieCast = lazy(() => import('./MovieCast.jsx'));

const Navigation = () => (
  <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/movies">Movies</NavLink>
  </nav>
);

const App = () => {
  return (
    <Router>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route path="/movies/:movieId/reviews" component={MovieReviews} />
          <Route path="/movies/:movieId/cast" component={MovieCast} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;