import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../../services/movies-api';
import s from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesAPI
      .fetchMovieReviews(movieId)
      .then(({ results }) => {
        if (results.length) {
          setReviews(results);
          return;
        }
        setReviews([]);
      })
      .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.Reviews}>
      <ul className={s.ReviewsList}>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id} className={s.ReviewsListItem}>
              <p className={s.ReviewsAuthor}>Author: {review.author}</p>
              <p className={s.ReviewsReview}>{review.content}</p>
            </li>
          ))
        ) : (
          <p className={s.NoInfo}>No review information.</p>
        )}
      </ul>
    </div>
  );
}
