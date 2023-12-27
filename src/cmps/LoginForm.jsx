import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { userService } from '../services/user.service'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

export function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: '',
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
