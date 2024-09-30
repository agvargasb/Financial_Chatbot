import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import api from "../../api/axios"
import "./Login.css"


const Login = () => {

  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("/api/auth/signin",
        JSON.stringify({ email, password }), {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      const accessToken = response?.data?.accessToken
      const id = response?.data?.user_id
      localStorage.setItem("token", accessToken);
      setAuth({ id, email, accessToken })
      setEmail('')
      setPassword('')
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response")
      } else if (err.response?.status === 403) {
        setErrMsg("Please check your email to activate your account")
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password")
      } else if (err.response?.status === 401) {
        setErrMsg("Not authorized")
      } else {
        setErrMsg("Login failed")
      }
      errRef.current.focus();
    }
  }


  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist])


  return (

    <div className='login' >
      <h1>Sign In</h1>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg} </p>
      <form className='' onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          autoComplete="off"
          placeholder={"Email"}
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          required
        />

        <label htmlFor="pass"></label>
        <input
          type="password"
          id="pass"
          placeholder={"Password"}
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          required
        />


        <button>Sign In</button>
      
        <p className='disclaimer'>If you don't have an account yet click on the 'REGISTER' button on the right.</p>
        <br />
          <Link to='/password-recover'> Forgot my password </Link>
     
      </form>
    </div>

  )
}

export default Login