import { useState, useEffect, lazy, Suspense } from 'react';
import { Link, NavLink, Route, useRouteMatch } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import { useHistory, useLocation } from 'react-router-dom';
import s from './MoviesView.module.css';
import noPoster from '../../images/no-poster.jpg';
import PageHeading from '../../components/PageHeading/PageHeading';
import Searchbar from '../../components/Searchbar/Searchbar';
import LoadMore from '../../components/LoadMore/LoadMore';

export default function MoviesView() {
  const { url, path } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalMovies, setTotalMovies] = useState(0);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.search === '') {
      console.log('location.search', location.search);
      return;
    }

    const newQuery = new URLSearchParams(location.search).get('query');
    setQuery(newQuery);
  }, [location.search]);

  useEffect(() => {
    if (query === '') return;

    moviesAPI
      .fetchMoviesSearch(query, page)
      .then(({ results, total_results }) => {
        setMovies(movies => [...movies, ...results]);
        setTotalMovies(total_results - movies.length);
      });
  }, [query, page]);

  const handleFormSubmit = newQuery => {
    if (query === newQuery) return;

    setQuery(newQuery);
    setMovies([]);
    setPage(1);
    setError(null);
    history.push({ ...location, search: `query=${newQuery}` });
  };

  const handleChangePage = () => {
    setPage(page => page + 1);
  };

  const onLoadMore = () => {
    handleChangePage();
    scrollTo();
  };

  const scrollTo = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 80,
        behavior: 'smooth',
      });
    }, 1000);
  };

  return (
    <>
      <PageHeading text="Search movies" />
      <Searchbar onSubmit={handleFormSubmit} />

      {movies && (
        <ul className={s.gallery}>
          {movies.map(movie => (
            <li key={movie.id} className={s.galleryItem}>
              <Link
                to={{
                  pathname: `movies/${movie.id}`,
                  state: { from: location },
                }}
                className={s.galleryItemLink}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : noPoster
                  }
                  alt={movie.original_title}
                  className={s.galleryItemImg}
                />
                <p className={s.galleryItemTitle}>{movie.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {totalMovies > 20 && <LoadMore onLoadMore={onLoadMore} />}
    </>
  );
}
