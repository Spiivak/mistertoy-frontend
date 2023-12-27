// AppHeader.jsx
import MisterToyLogo from '../assets/img/mistertoy-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { userService } from '../services/user.service';
import { SET_USER } from '../store/reducers/user.reducer';
import React, { useState } from 'react';
import { Modal } from './Modal';
import { Avatar, Tooltip, Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export function AppHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((storeState) => storeState.userModule.loggedinUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function onLogout() {
    userService
      .logout()
      .then(() => {
        onSetUser(null);
      })
      .catch((err) => {
        showErrorMsg('OOPs try again');
      });
  }

  function onSetUser(user) {
    dispatch({ type: SET_USER, user });
    navigate('/');
  }

  const openModal = (loginMode) => {
    setIsLoginMode(loginMode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {!location.pathname.includes('/admin') && (
        <header className="app-header flex space-between align-center">
          <div className="logo">
            <img src={MisterToyLogo} alt="" />
          </div>
          <div className="links">
            <nav className="app-nav flex">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/toy">Toys</NavLink>
            </nav>
          </div>
          {user ? (
            <section className='app-header-loggedin flex align-center'>
              <div className="avatar-container flex align-center">
              <Tooltip title={user.fullname} arrow>
                <Avatar alt={user.fullname} src="/static/images/avatar/1.jpg" onClick={handleMenuOpen} />
              </Tooltip>
                <p>{user.fullname}</p>
              </div>
              <Menu
                id="avatar-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                {user.isAdmin && <MenuItem onClick={handleMenuClose}>Admin</MenuItem>}
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </Menu>
            </section>
          ) : (
            <section className='app-header-actions flex'>
              <button onClick={() => openModal(true)}>Login</button>
              <button onClick={() => openModal(false)}>Register</button>
            </section>
          )}
        </header>
      )}

      {/* Render Modal */}
      {isModalOpen && !user && (
        <Modal onClose={closeModal} onSetUser={onSetUser} isLoginMode={isLoginMode} />
      )}
    </>
  );
}
