import { useState } from "react"
import { login, signup } from "../store/actions/user.actions"
import { LoginForm } from "./LoginForm"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function LoginSignup({ onSetUser }) {

    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        login(credentials)
            .then(onSetUser)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    function _signup(credentials) {
        signup(credentials)
            .then(onSetUser)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    return (
        <div className="login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </div >
    )
}
