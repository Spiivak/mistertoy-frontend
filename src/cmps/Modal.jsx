// Modal.jsx
import React from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { userService } from '../services/user.service';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};

export function Modal({ onClose, onSetUser, isLoginMode }) {

//   function onLogin(credentials) {
//     isSignup ? _signup(credentials) : _login(credentials)
// }

// function _login(credentials) {
//     login(credentials)
//         .then(onSetUser)
//         .then(() => { showSuccessMsg('Logged in successfully') })
//         .catch((err) => { showErrorMsg('Oops try again') })
// }

// function _signup(credentials) {
//     signup(credentials)
//         .then(onSetUser)
//         .then(() => { showSuccessMsg('Signed in successfully') })
//         .catch((err) => { showErrorMsg('Oops try again') })
// }

  const handleLogin = (credentials) => {
    userService
      .login(credentials)
      .then((user) => {
        onSetUser(user);
        onClose();
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  const handleRegister = (credentials) => {
    userService
      .signup(credentials)
      .then((user) => {
        onSetUser(user)
        console.log('###############################')
        onClose()
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        <IconButton aria-label="delete" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <div className="modal-body">
          {isLoginMode ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <RegisterForm onRegister={handleRegister} />
          )}
        </div>
      </div>
    </div>
  );
}
