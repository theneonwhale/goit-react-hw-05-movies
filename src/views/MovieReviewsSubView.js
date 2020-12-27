import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import * as moviesAPI from '../services/movies-api';

export default function MovieReviewsSubView({ movie }) {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    moviesAPI
      .fetchMovieReviews(movieId)
      .then(response => {
        console.log('1', response);
        setReviews(response);
      })
      .catch(error => console.log(error));
    // .then(setTrendingMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(reviews);
  return (
    <>
      <ul>
        {reviews &&
          reviews.results.map(review => (
            <li key={review.id}>
              <p>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
