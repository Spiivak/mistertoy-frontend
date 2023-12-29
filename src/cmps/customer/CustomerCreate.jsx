import { useDispatch } from "react-redux";
import { RegisterForm } from "../RegisterForm";
import { useNavigate } from "react-router-dom";
import { SET_USER } from "../../store/reducers/user.reducer";
import { userService } from "../../services/user.service";

export function CustomerCreate() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function onSetUser(user) {
    dispatch({ type: SET_USER, user });
    navigate('/catalog');
  }

  async function handleRegister(credentials){
    
    try {
      const user = await userService.signup(credentials)
      onSetUser(user)
      onClose()
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div>
      <h1>Customer Create</h1>
      <RegisterForm onRegister={handleRegister}/>
    </div>
  )
}
