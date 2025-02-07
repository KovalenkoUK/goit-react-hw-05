import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        headers: { Authorization: `Bearer api_read_access_token` }
      });
      setReviews(response.data.results);
    };
    fetchReviews();
  }, [movieId]);

  if (!reviews.length) return <div>No reviews available.</div>;

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;