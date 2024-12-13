import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteContact, updateContact } from '../../redux/contacts/operations';
import css from './Contact.module.css';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Contact({ item: { name, number, id } }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newNumber, setNewNumber] = useState(number);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success('Contact deleted!');
        setIsModalOpen(false);
      })
      .catch(error => {
        toast.error('Failed to delete contact');
        console.log(error);
        setIsModalOpen(false);
      });
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateContact({ id, name: newName, number: newNumber }))
      .unwrap()
      .then(() => {
        toast.success('Contact updated!');
        setIsEditing(false);
      })
      .catch(error => {
        toast.error('Failed to update contact');
        console.log(error);
      });
  };

  return (
    <div className={css.wrapper}>
      <div>
        <h2>
          <FaUser color="#4682B4" size={20} />
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
          ) : (
            name
          )}
        </h2>
        <p className={css.text}>
          <FaPhoneAlt color="#4682B4" size={20} />
          {isEditing ? (
            <input
              type="tel"
              value={newNumber}
              onChange={e => setNewNumber(e.target.value)}
            />
          ) : (
            number
          )}
        </p>
      </div>

      <div className={css.buttons}>
        {isEditing ? (
          <button className={css.button} type="button" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className={css.button} type="button" onClick={handleEdit}>
            Edit
          </button>
        )}

        <button className={css.button} type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelDelete}
        contentLabel="Confirm Deletion"
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <h2>Are you sure you want to delete this contact?</h2>
        <div className={css.modalButtons}>
          <button className={css.confirm} onClick={confirmDelete}>
            Yes
          </button>
          <button className={css.cancel} onClick={cancelDelete}>
            No
          </button>
        </div>
      </Modal>
    </div>
  );
}
