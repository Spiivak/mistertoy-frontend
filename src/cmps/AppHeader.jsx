// AppHeader.jsx
import MisterToyLogo from '../assets/img/mistertoy-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { userService } from '../services/user.service';
import { SET_USER } from '../store/reducers/user.reducer';
import React, { useState } from 'react';
import { Modal } from './Modal';
import { Avatar, Tooltip, Menu, MenuItem, IconButton, Chip } from '@mui/material';
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

  async function onLogout() {
    try {
      await userService.logout()
      onSetUser(null)
    } catch (err) {
      showErrorMsg('Oops try again');
    }
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
              {/* <div className="avatar-container flex align-center"> */}
                <Tooltip title={user.fullname} arrow>
                  <Chip avatar={<Avatar>M</Avatar>} label={user.fullname} onClick={handleMenuOpen}/>
                  {/* <Chip
                    avatar={<Avatar alt="Natacha"/>}
                    label="Avatar"
                    variant="outlined"
                  /> */}
                </Tooltip>
              {/* </div> */}
              <Menu
                id="avatar-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                {user.isAdmin && <NavLink to={'/admin/dashboard'}><MenuItem onClick={handleMenuClose}>Admin</MenuItem></NavLink>}
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
