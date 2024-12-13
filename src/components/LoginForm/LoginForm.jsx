import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import clsx from 'clsx'; // Імпортуємо clsx
import css from './LoginForm.module.css';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Password must not exceed 30 characters')
    .required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => toast.success('Success!'))
      .catch(error => {
        toast.error('Please try one more time');
        console.log(error);
      });
    actions.resetForm();
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
            <label className={css.label} htmlFor={emailFieldId}>
              Email
            </label>
            <Field
              className={clsx(css.field, {
                [css.errorField]: errors.email && touched.email,
              })}
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
              className={clsx(css.field, {
                [css.errorField]: errors.password && touched.password,
              })}
              id={passwordFieldId}
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            {errors.password && touched.password && (
              <div className={css.error}>{errors.password}</div>
            )}
          </div>

          <button className={css.button} type="submit">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
