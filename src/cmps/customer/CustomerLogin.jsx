import { useDispatch } from "react-redux";
import { SET_USER } from "../../store/reducers/user.reducer";
import { LoginForm } from "./LoginForm";
import { userService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";

export function CustomerLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function onSetUser(user) {
    dispatch({ type: SET_USER, user });
    navigate('/catalog');
  }
  async function handleLogin(credentials) {
    try {
      const user = await userService.login(credentials);
      onSetUser(user)
      onClose()
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  return (
    <div>
      <h1>Customer Login</h1>
      <LoginForm onLogin={handleLogin}/>
    </div>
  )
}
