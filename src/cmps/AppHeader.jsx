// AppHeader.jsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import tosr from '../assets/img/toysr-logo.webp'

import { userService } from '../services/user.service'
import { SET_USER } from '../store/reducers/user.reducer'

import { Avatar, Tooltip, Menu, MenuItem, Chip } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu';

export function AppHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    if(!user) return
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  async function onLogout() {
    try {
      await userService.logout()
      onSetUser(null)
    } catch (err) {
      showErrorMsg('Oops try again')
    }
  }

  function onSetUser(user) {
    dispatch({ type: SET_USER, user })
    navigate('/')
  }

  return (
    <>
      {!location.pathname.includes('/admin') && (
        <header className="app-header full flex align-center">
          {/* LINKS */}
          <div className="links">
            <nav className="app-nav flex">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about-us">About</NavLink>
              <NavLink to="/catalog">Toys</NavLink>
            </nav>
          </div>
          {/* LOGO */}
          <div className="logo">
            <img src={tosr} alt="" />
          </div>
          {/* USER CHIP WITH MODAL */}
          {user ? (
            <section className='app-header-loggedin flex align-center'>
                <Tooltip title={user.fullname} arrow>
                  <Chip avatar={<Avatar>E</Avatar>} label={user.fullname} onClick={handleMenuOpen}/>
                </Tooltip>
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
              <button className='btn-icon small-transparent'><ShoppingCartIcon /></button>
            </section>
          ) : (
            <section className='app-header-actions flex'>
              <button className='btn-login' onClick={() => navigate('/customer/account/login')}>Login</button>
              <button className='btn-register' onClick={() => navigate('/customer/account/create')}>Register</button>
              {/* <button className='btn-register' onClick={() => openModal(false)}>Register</button> */}
            </section>
          )}
        </header>
      )}

    </>
  )
}
