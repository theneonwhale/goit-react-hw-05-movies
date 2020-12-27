import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../../services/movies-api';
import noPhoto from '../../images/no-photo.jpg';
import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    moviesAPI
      .fetchMovieCast(movieId)
      .then(({ cast }) => {
        if (cast.length) {
          setCast(cast);
          return;
        }
        setCast([]);
      })
      .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.Cast}>
      <ul className={s.CastList}>
        {cast.length > 0 ? (
          cast.map(actor => (
            <li key={actor.id} className={s.CastItem}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : noPhoto
                }
                alt={actor.name}
                width="130"
              />
              <p className={s.ActorName}>{actor.name}</p>
              <p className={s.ActorCharacter}>{actor.character}</p>
            </li>
          ))
        ) : (
          <p className={s.NoInfo}>No cast information.</p>
        )}
      </ul>
    </div>
  );
}
