import { useState, useEffect, lazy, Suspense } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import s from './HomeView.module.css';
import Loader from '../../components/Loader/Loader';

const PageHeading = lazy(() =>
  import(
    '../../components/PageHeading/PageHeading' /* webpackChunkName: "page-heading" */
  ),
);
const LoadMore = lazy(() =>
  import(
    '../../components/LoadMore/LoadMore' /* webpackChunkName: "load-more" */
  ),
);

export default function HomeView() {
  const location = useLocation();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    return moviesAPI
      .fetchTrendingMovies(page)
      .then(({ results, total_results }) => {
        setTrendingMovies(trendingMovies => [...trendingMovies, ...results]);
        setTotalMovies(total_results - trendingMovies.length);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
    <Suspense fallback={<Loader />}>
      <PageHeading text="Trending movies today" />
      {trendingMovies && (
        <ul className={s.gallery}>
          {trendingMovies.map(movie => (
            <li key={movie.id} className={s.galleryItem}>
              <NavLink
                to={{
                  pathname: `movies/${movie.id}`,
                  state: { from: location },
                }}
                className={s.galleryItemLink}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.original_title}
                  className={s.galleryItemImg}
                />
                <p className={s.galleryItemTitle}>{movie.title}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      {totalMovies > 20 && <LoadMore onLoadMore={onLoadMore} />}
    </Suspense>
  );
}
