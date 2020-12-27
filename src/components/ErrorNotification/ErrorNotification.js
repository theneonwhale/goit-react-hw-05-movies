import PropTypes from 'prop-types';
import s from './ErrorNotification.module.css';
import errorImg from '../../images/error.png';

export default function ErrorNotification({ message }) {
  return (
    <div className={s.ErrorNotification}>
      <p className={s.ErrorMessage}> {message} </p>
      <img src={errorImg} alt="error" width="500" />
    </div>
  );
}

ErrorNotification.propTypes = {
  message: PropTypes.string.isRequired,
};
