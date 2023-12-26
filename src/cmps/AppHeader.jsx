// AppHeader.jsx
import MisterToyLogo from '../assets/img/mistertoy-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { userService } from '../services/user.service';
import { SET_USER } from '../store/reducers/user.reducer';
import React, { useState } from 'react';
import { Modal } from './Modal';

export function AppHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((storeState) => storeState.userModule.loggedinUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

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
        <header className="app-header flex space-between align-center full">
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
            <section>
              <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
              <button onClick={onLogout}>Logout</button>
            </section>
          ) : (
            <section>
              <button onClick={() => openModal(true)}>Login</button>
              <button onClick={() => openModal(false)}>Register</button>
            </section>
          )}
        </header>
      )}

      {/* Render Modal */}
      {isModalOpen && (
        <Modal onClose={closeModal} onSetUser={onSetUser} isLoginMode={isLoginMode} />
      )}
    </>
  );
}
