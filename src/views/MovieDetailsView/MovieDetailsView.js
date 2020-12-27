import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  Route,
  useRouteMatch,
  useParams,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';

import * as moviesAPI from '../../services/movies-api';

import PageHeading from '../../components/PageHeading/PageHeading';
import MovieCreditsSubView from '../../views/MovieCreditsSubView';
import MovieReviewsSubView from '../../views/MovieReviewsSubView';
import noPoster from '../../images/no-poster.jpg';
import s from './MovieDetailsView.module.css';

export default function MovieDetailsView() {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    // if (!movieId) return;
    console.log(movieId);
    console.log(url);
    console.log(location);
    console.log(history);

    moviesAPI.fetchMovieDetails(movieId).then(movie => {
      setMovie(movie);
    });
    // .then(setTrendingMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const handleGoBack = () => {
    if (!location.state) {
      history.push('/');
      return;
    }
    history.push({ ...location.state.from });
  };

  return (
    <div>
      {/* <PageHeading text={movie.original_title} /> */}
      <button onClick={handleGoBack} type="button">
        Go back
      </button>
      {movie && (
        <div className={s.movieCard}>
          <div className={s.movieCardMain}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : noPoster
              }
              alt={movie.title}
              // width="500"
            />
            <div className={s.Description}>
              <h2>{movie.title}</h2>
              <h3>{movie.original_title}</h3>
              <p>{movie.release_date.slice(0, 4)}</p>
              <p>Rate: {movie.vote_average}</p>
              <p>Tagline: {movie.tagline}</p>

              <p>
                Budget: $
                {movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </p>
              <p>Runtime: {movie.runtime} min</p>
              <p>
                Genres:{' '}
                {movie.genres
                  .reduce((acc, { name }) => {
                    acc.push(name);
                    return acc;
                  }, [])
                  .join(', ')}
              </p>
              <p>Storyline: {movie.overview}</p>
            </div>
          </div>
          <div>
            <h3>Additional information</h3>
            <ul>
              {/* <li>Cast</li> */}
              <li>
                <NavLink to={`${url}/cast`}>Cast</NavLink>
              </li>
              <li>
                <NavLink to={`${url}/reviews`}>Reviews</NavLink>
              </li>
            </ul>
            <Suspense fallback={<h1>Загружаем подмаршрут...</h1>}>
              <Switch>
                <Route path={`${path}/cast`}>
                  {movie && <MovieCreditsSubView movie={movie} />}
                </Route>
                <Route path={`${path}/reviews`}>
                  {movie && <MovieReviewsSubView movie={movie} />}
                </Route>
              </Switch>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
