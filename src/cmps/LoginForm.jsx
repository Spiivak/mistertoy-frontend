import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { userService } from '../services/user.service'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

export function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const formik = useFormik({
    initialValues: credentials,
    validationSchema: LoginValidationSchema,
    onSubmit: (values) => {
      onLogin(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className='login-form flex column'>
      <TextField
        id="email"
        name="email"
        autoComplete="email"
        label="Email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
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
        Login
      </Button>
    </form>
  )
}
