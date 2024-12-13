import { changeFilter } from '../../redux/filters/slice';
import { selectNameFilter } from '../../redux/filters/selectors';
import { useDispatch, useSelector } from 'react-redux';
import css from './SearchBox.module.css';
import { useId } from 'react';

export default function SearchBox() {
  const filterName = useSelector(selectNameFilter);
  const dispatch = useDispatch();
  const id = useId();
  const handleChange = event => {
    dispatch(changeFilter(event.target.value));
  };
  return (
    <div>
      <label
        style={{ marginLeft: 20, marginBottom: 5 }}
        className={css.wrapper}
        htmlFor={id}
      >
        Search by name
      </label>
      <input
        className={css.input}
        id={id}
        type="text"
        value={filterName}
        onChange={handleChange}
        placeholder="Please enter the name"
      />
    </div>
  );
}
