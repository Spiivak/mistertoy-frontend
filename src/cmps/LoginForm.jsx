import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { userService } from '../services/user.service'

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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="username">User Name:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && <div>{formik.errors.username}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
