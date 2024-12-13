import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { register } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css';
import clsx from 'clsx';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(23, 'Password must not exceed 30 characters')
    .required('Required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(register(values)).unwrap();
      toast.success('Success!');
      actions.resetForm();
    } catch (error) {
      toast.error('Please try one more time');
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label className={css.label} htmlFor={nameFieldId}>
              Name
            </label>
            <Field
              className={clsx(
                css.field,
                errors.name && touched.name && css.errorField
              )}
              id={nameFieldId}
              type="text"
              name="name"
              placeholder="Enter your name"
            />
            {errors.name && touched.name && (
              <div className={css.error}>{errors.name}</div>
            )}
          </div>

          <div className={css.formGroup}>
            <label className={css.label} htmlFor={emailFieldId}>
              Email
            </label>
            <Field
              className={clsx(
                css.field,
                errors.email && touched.email && css.errorField
              )}
              id={emailFieldId}
              type="email"
              name="email"
              placeholder="Enter your email"
            />
            {errors.email && touched.email && (
              <div className={css.error}>{errors.email}</div>
            )}
          </div>

          <div className={css.formGroup}>
            <label className={css.label} htmlFor={passwordFieldId}>
              Password
            </label>
            <Field
              className={clsx(
                css.field,
                errors.password && touched.password && css.errorField
              )}
              id={passwordFieldId}
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            {errors.password && touched.password && (
              <div className={css.error}>{errors.password}</div>
            )}
          </div>

          <button
            className={clsx(css.button, css.registerButton)}
            type="submit"
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
