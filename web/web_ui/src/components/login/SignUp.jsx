import React, { useRef, useState, useEffect } from 'react';
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {  useNavigate, useLocation } from 'react-router-dom';
import './SignUp.css'


import Swal from 'sweetalert2'
import api from '../../api/axios';


const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const SignUp = () => {

const emailRef = useRef();
const errRef = useRef();

const [email, setEmail] = useState("");
const [validEmail, setValidEmail] = useState(false)
const [emailFocus, setEmailFocus] = useState(false)

const [password, setPassword]= useState("")
const [validPassword, setValidPassword] = useState(false)
const [passwordFocus, setPasswordFocus] = useState(false)

const [matchpassword, setMatchPassword]= useState("")
const [validMatch, setValidMatch] = useState(false)
const [matchFocus, setMatchFocus] = useState(false)

const [errMsg, setErrMsg]= useState("")
const [success, setSuccess]= useState(false)
const location = useLocation();
const from = location.state?.from?.pathname || "/";
const navigate = useNavigate();


useEffect(()=>{
  emailRef.current.focus();
},[])

useEffect(()=>{
  const result = EMAIL_REGEX.test(email)
  setValidEmail(result);
},[email])

useEffect(()=>{
  const result = PASS_REGEX.test(password)
  setValidPassword(result)
  const match = password == matchpassword
  setValidMatch(match);
},[password, matchpassword])

useEffect(()=>{
  setErrMsg('');
},[email,password, matchpassword])


const handleSubmit = async (e) => {
  e.preventDefault();
  // if button enabled with JS hack
  const v1 = EMAIL_REGEX.test(email);
  const v2 = PASS_REGEX.test(password)
  if(!v1 && !v2) {
    setErrMsg("Invalid Entry");
    return;
  }
  try {
    const response = await api.post("/api/auth/signup",
    JSON.stringify({email, password}),
    {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: false
    })
    setSuccess(true)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'We have sent a confirmation email to you inbox. ¡Thank You!',
      showConfirmButton: false,
      timer: 2500
    })
    navigate(from, {replace:true});
    //clear input fields
  } catch (err) {
    if(!err?.response){
      setErrMsg("No server response")
    } else if (err.response?.status === 409) {
        setErrMsg("Try again with a different email")
    } else if (err.response?.status === 401) {
      setErrMsg("Unauthorized")
    } else {
      setErrMsg("Registration failed")
    }
    errRef.current.focus();
  }


}

return (
  <section className='signUp' >
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive" >{errMsg} </p>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="" >
          <label htmlFor="email"></label>
          <span className={validEmail ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validEmail || !email ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <input id="loginEmail" ref={emailRef} autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={"Email"} aria-invalid={validEmail ? "false" : "true"} aria-describedby="uidnote" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} 
          required /> 
          <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"} >
            <FontAwesomeIcon icon={faInfoCircle} /> You must enter a valid email.
          </p>

          <label htmlFor="password"></label>
          <span className={validPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPassword || !password ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" aria-invalid={validPassword ? "false" : "true"} aria-describedby="passnote" onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)}  placeholder={"Password"} required/>
          <p id="passnote" className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"} >
            <FontAwesomeIcon icon={faInfoCircle} />  
            
            Your password needs to be between 8 and 24 characters long, containing uppercase letters and numbers.
          </p>


          <label htmlFor="confirmpassword"></label>
          <span className={validMatch && matchpassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchpassword ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <input id="confirmpassword" onChange={(e) => setMatchPassword(e.target.value)} type="password" aria-invalid={validMatch ? "false" : "true"} aria-describedby="confirmnote" onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)}  placeholder={"Repeat your password"}  required />
          <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"} >
            <FontAwesomeIcon icon={faInfoCircle} /> 
            The passwords entered do not match.
          </p>
          <button disabled={!validEmail || !validPassword || !validMatch ? true : false} >Sign up</button>
          <p className='disclaimer'>If you already have an account click on the 'LOG IN' button on the left.</p>
      </form>
  </section>

  )
}

export default SignUp