import React from 'react'
import { useSearchParams } from 'react-router-dom';
import api from "../api/axios"
import "./ForgotPass.css"
import Swal from "sweetalert2";
import {  useNavigate } from 'react-router-dom';

function Activate() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    let emailQuery = searchParams.get("email")
    let activateTokenQuery = searchParams.get("activateToken")

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await api.post("/api/activate",
          JSON.stringify({email: emailQuery, activateToken: activateTokenQuery }),{
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: false,
          
          });
          Swal.fire({
            title: 'Your account has been successfully activated. Please try logging in again.',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            icon: 'success',
          })
          navigate("/");
        }
          catch(err){console.error("There was an error.. ",err)}
    }
  return (
        <div className="mainDiv container">
            <div className="secondDiv">
                <header >Activate your Account </header>
                <p>Click on the following button to Activate your Account </p>
                <form id="forgotPasswordForm" onSubmit={handleSubmit}>
                    <button id="fpButton"> Activate </button>
                </form>
            </div>
        </div>
  )

}

export default Activate