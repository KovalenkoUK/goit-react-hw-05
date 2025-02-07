import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <h1>Page Not Found</h1>
    <NavLink to="/">Go back to Home</NavLink>
  </div>
);

export default NotFoundPage;