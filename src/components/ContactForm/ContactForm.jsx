import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/contacts/operations';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import css from './ContactForm.module.css';
import toast from 'react-hot-toast';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    number: '',
  };

  const nameFieldId = nanoid();
  const numberFieldId = nanoid();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
      })
    )
      .unwrap()
      .then(() => toast.success('Success!'))
      .catch(error => {
        toast.error('Please try one more time');
        console.log(error);
      });
    actions.resetForm({ values: initialValues });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.inputWrapper}>
            <label htmlFor={nameFieldId}>Name</label>
            <Field
              className={css.input}
              type="text"
              name="name"
              id={nameFieldId}
              placeholder="Enter the name"
            ></Field>
            <ErrorMessage className={css.err} name="name" component="span" />
          </div>

          <div className={css.inputWrapper}>
            <label htmlFor={numberFieldId}>Number</label>
            <Field
              className={css.input}
              type="text"
              name="number"
              id={numberFieldId}
              placeholder="0934277435"
            ></Field>
            <ErrorMessage className={css.err} name="number" component="span" />
          </div>

          <div className={css.btnWrapper}>
            <button className={css.btn} type="submit">
              Add contact
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
