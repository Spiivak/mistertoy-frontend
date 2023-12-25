import MisterToyLogo from '../assets/img/mistertoy-logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service'
import { SET_USER } from '../store/reducers/user.reducer'
import { LoginSignup } from './LoginSignup'

export function AppHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(storeState => storeState.userModule.loggedinUser)

  function onLogout() {
    userService.logout()
      .then(() => {
        onSetUser(null)
      })
      .catch((err) => {
        showErrorMsg('OOPs try again')
      })
  }

  function onSetUser(user) {
    dispatch({ type: SET_USER, user })
    navigate('/')
  }

  return (
    <header className='app-header flex space-between align-center full'>
      <div className="logo">
        <img src={MisterToyLogo} alt="" />
      </div>
      <div className="links">
        <nav className="app-nav flex">
          <NavLink to="/" >Home</NavLink>
          <NavLink to="/about" >About</NavLink>
          <NavLink to="/toy" >Toys</NavLink>
        </nav>
      </div>
      {user ? (
        < section >
          <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
          <button onClick={onLogout}>Logout</button>
        </ section >
      ) : (
        <section>
          <LoginSignup onSetUser={onSetUser} />
        </section>
      )}
    </header>
  )
}