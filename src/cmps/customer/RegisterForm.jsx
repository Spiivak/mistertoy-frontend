// RegisterForm.jsx
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { signup } from '../../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

const RegisterValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  fullname: Yup.string().required('Required'),
  phone: Yup.string().matches(/^[0-9]*$/, 'Invalid phone number').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
  acceptCommercial: Yup.boolean().oneOf([true], 'Must accept commercial communications'),
  acceptSitePolicies: Yup.boolean().oneOf([true], 'Must accept site policies').required('Must accept site policies'),
})

export function RegisterForm({ onRegister }) {
  const formik = useFormik({
    initialValues: {
      email: '',
      fullname: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptSMS: false,
      acceptSitePolicies: false,
    },
    validationSchema: RegisterValidationSchema,
    onSubmit: (values) => {
      console.log('Submitting form with values:', values)
      onRegister(values)
      // handleRegister(values)
    },
  })

  // async function handleRegister(credentials) {
  //   try {
  //     console.log('Registering user with credentials:', credentials)
  //     const userSignUp = await signup(credentials)
  //     console.log('User signed up successfully:', userSignUp)
  //     onSetUser(userSignUp)
  //     showSuccessMsg('Signed up successfully')
  //     onClose()
  //   } catch (err) {
  //     console.error('Error during registration:', err)
  //     showErrorMsg('Oops, try again')
  //   }
  // }

  return (
    <form onSubmit={formik.handleSubmit} className="register-form flex column">
      <TextField
        id="email"
        name="email"
        label="Email"
        autoComplete="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
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
        id="phone"
        name="phone"
        label="Phone Number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
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
        autoComplete="new-password"
      />
      <TextField
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        autoComplete="new-password"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="acceptSMS" // changed from acceptCommercial to acceptSMS
            name="acceptSMS"
            checked={formik.values.acceptSMS}
            onChange={formik.handleChange}
            color="primary"
          />
        }
        label="I accept commercial communications"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="acceptSitePolicies"
            name="acceptSitePolicies"
            checked={formik.values.acceptSitePolicies}
            onChange={formik.handleChange}
            color="primary"
          />
        }
        label="I accept site policies"
      />
      <Button type="submit" variant="contained" color="primary" disabled={!formik.isValid}>
        Register
      </Button>
    </form>
  )
}
