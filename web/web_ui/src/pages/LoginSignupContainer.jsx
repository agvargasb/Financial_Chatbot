import React, { useRef, useState } from 'react'
import Login from '../components/login/Login'
import './LoginSignupContainer.css'
import SignUp from '../components/login/SignUp'

const LoginSignupContainer = () => {
// defino estado para saber si login o singup estan clickeados o visibles 
const[login, setLogin]= useState(true)

//signup
const [userToSign, setUserToSign] = useState({
  email: "",
  password: ""
})

    //creo referencia para login-signup container
const loginSignupContainerRef = useRef(null)

const handleClick = () => {
    setLogin(!login)
    // con useRef podemos hacer uso del DOM
    loginSignupContainerRef.current.classList.toggle("active")
}
  return (
    <div className='login-signup-container' ref={loginSignupContainerRef} > 
    <Login /> 
        <div className="side-div">
          <button type="button" onClick={handleClick}> 
          {" "}
          {login ? "Register" : "Log in"} 
          </button>
        </div>
    <SignUp userToSign={userToSign} setUserToSign={setUserToSign} /> 
    </div>
  )
}


export default LoginSignupContainer;