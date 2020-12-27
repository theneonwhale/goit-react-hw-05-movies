import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import * as moviesAPI from '../services/movies-api';

export default function MovieCreditsSubView({ movie }) {
  const { movieId } = useParams();
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    // if (!query) return;

    moviesAPI
      .fetchMovieCredits(movieId)
      .then(response => {
        console.log('1', response);
        setCredits(response);
      })
      .catch(error => console.log(error));
    // .then(setTrendingMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);
  console.log('2', credits);
  return (
    <>
      <ul>
        {credits &&
          credits.cast.map(actor => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
              <p>{actor.name}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
