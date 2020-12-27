import s from './MovieDetails.module.css';
import noPoster from '../../images/no-poster.jpg';
// {
//   title,
//   original_title,
//   release_date,
//   vote_average,
//   tagline,
//   poster_path,
//   budget,
//   runtime,
//   genres,
//   overview,
// }
export default function MovieDetails(movie) {
  return (
    <div>
      <h2>{movie.title}</h2>
      <h3>{movie.original_title}</h3>
      {/* <p>{release_date.slice(0, 4)}</p> */}
      <p>Rate: {movie.vote_average}</p>
      <p>Tagline: {movie.tagline}</p>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : noPoster
        }
        alt={movie.title}
      />
      {/* <p>Budget: ${budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p> */}
      <p>Runtime: {movie.runtime} min</p>
      <p>
        Genres:{' '}
        {/* {genres
          .reduce((acc, { name }) => {
            acc.push(name);
            return acc;
          }, [])
          .join(', ')} */}
      </p>
      <p>Storyline: {movie.overview}</p>
    </div>
  );
}
