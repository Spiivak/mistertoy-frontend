// RegisterForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signup } from '../store/actions/user.actions';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RegisterValidationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  fullname: Yup.string().required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

export function RegisterForm({ onSetUser, onClose, onRegister }) {
  const formik = useFormik({
    initialValues: {
      username: '',
      fullname: '',
      password: '',
    },
    validationSchema: RegisterValidationSchema,
    onSubmit: (values) => {
      onRegister(values);
    },
  });

  const handleRegister = (credentials) => {
    signup(credentials)
      .then((user) => {
        onSetUser(user);
        showSuccessMsg('Signed up successfully');
        onClose(); // Close the modal after successful registration
      })
      .catch((err) => {
        showErrorMsg('Oops, try again');
      });
  };

  return (
    <form onSubmit={formik.handleSubmit} className='register-form flex column'>
      <TextField
        id="username"
        name="username"
        autoComplete="username"
        label="User Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
      <TextField
        id="fullname"
        name="fullname"
        label="Full Name"
        autoComplete="fullname"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.fullname}
        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
        helperText={formik.touched.fullname && formik.errors.fullname}
      />
      <TextField
        type="password"
        id="password"
        name="password"
        label="Password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        autoComplete='current-password'
      />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>
  );
}
