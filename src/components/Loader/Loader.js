import LoaderSpinner from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.Loader}>
      <LoaderSpinner type="TailSpin" color="#00BFFF" height={90} width={90} />
    </div>
  );
}
