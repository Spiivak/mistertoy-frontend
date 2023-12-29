// Modal.jsx
import { useEffect } from 'react';
// import { LoginForm } from './LoginForm';
// import { RegisterForm } from './RegisterForm';
// import { userService } from '../services/user.service';
// import { IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  zIndex: '9999',
};

export function Modal({ onClose, onSetUser, isLoginMode }) {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await userService.login(credentials);
      onSetUser(user);
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async (credentials) => {
    
    try {
      const user = await userService.signup(credentials);
      onSetUser(user);
      onClose();
    } catch (error) {
      console.error('Registration failed:', error);
    }
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
