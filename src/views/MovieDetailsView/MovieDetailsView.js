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
import s from './MovieDetailsView.module.css';
import noPoster from '../../images/no-poster.jpg';
import Loader from '../../components/Loader/Loader';
import { FaAngleLeft } from 'react-icons/fa';

const MovieCastSubView = lazy(() =>
  import(
    '../MovieCastSubView/MovieCastSubView' /* webpackChunkName: "movie-credits" */
  ),
);

const MovieReviewsSubView = lazy(() =>
  import(
    '../MovieReviewsSubView/MovieReviewsSubView' /* webpackChunkName: "movie-reviews" */
  ),
);

export default function MovieDetailsView() {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    moviesAPI
      .fetchMovieDetails(movieId)
      .then(movie => {
        setMovie(movie);
      })
      .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    if (!location.state) {
      history.push('/');
      return;
    }
    history.push({ ...location.state.from });
  };

  return (
    <div>
      <button onClick={handleGoBack} type="button" className={s.BackBtn}>
        <FaAngleLeft />
        <span className={s.GoBack}>Go back</span>
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
              width="300"
              className={s.MovieImg}
            />
            <div className={s.Description}>
              <h2 className={s.MovieTitle}>{movie.title}</h2>
              <h3 className={s.MovieOriginalTitle}>{movie.original_title}</h3>
              <p className={s.MovieDetails}>{movie.release_date.slice(0, 4)}</p>
              <p className={s.MovieDetails}>Rate: {movie.vote_average}</p>
              {movie.tagline && (
                <p className={s.MovieDetails}>Tagline: {movie.tagline}</p>
              )}

              <p className={s.MovieDetails}>
                Budget: $
                {movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </p>
              <p className={s.MovieDetails}>Runtime: {movie.runtime} min</p>
              <p className={s.MovieDetails}>
                Genres:{' '}
                {movie.genres
                  .reduce((acc, { name }) => {
                    acc.push(name);
                    return acc;
                  }, [])
                  .join(', ')}
              </p>
              <p className={s.MovieDetails}>Storyline: {movie.overview}</p>
            </div>
          </div>
          <div className={s.AdditionalInfo}>
            <h3 className={s.AdditionalTitle}>Additional information</h3>
            <ul className={s.AdditionalList}>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/cast`,
                    state: { from: location.state ? location.state.from : '/' },
                  }}
                  className={s.AdditionalListItem}
                  activeClassName={s.activeLink}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: { from: location.state ? location.state.from : '/' },
                  }}
                  className={s.AdditionalListItem}
                  activeClassName={s.activeLink}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route path={`${path}/cast`}>
                  {movie && <MovieCastSubView movie={movie} />}
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
