import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import css from './Contact.module.css';

export default function Contact({ item: { name, number, id } }) {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <div className={css.wrapper}>
      <div>
        <h2>
          <FaUser color="#4682B4" size={20} />
          {name}
        </h2>
        <p className={css.text}>
          <FaPhoneAlt color="#4682B4" size={20} />
          {number}
        </p>
      </div>
      <button className={css.button} type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
