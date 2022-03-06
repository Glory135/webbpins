import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cancel_img from "../../images/icon-cancel.svg";
import "./login.css";

function Login({ setAdmin }) {
  const [error, setError] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://webbpins.herokuapp.com/api/admin/login",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
      const token = response.data.token;
      const admin = response.data.admin;
      setAdmin(admin);
      if (token) {
        localStorage.setItem("webbpins_admin_token", JSON.stringify(token));
        navigate("/admin/dashboard");
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
        console.log("token not found");
      }
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      console.log("Admin not found");
    }
  };
  return (
    <>
      <div className='admin_login'>
        <div className='admin_form_container'>
          <div className='admin_form_container_2'>
            <div className='admin_form_label'>
              <h2>Admin Login</h2>
            </div>
            <form className='admin_login_form' onSubmit={handleSubmit}>
              <label>
                <h3>Email</h3>
                <input
                  type='email'
                  name='email'
                  placeholder='email'
                  ref={emailRef}
                  required
                />
              </label>
              <br />
              <label>
                <h3>Password</h3>
                <input
                  type='password'
                  name='password'
                  placeholder='password'
                  ref={passwordRef}
                  required
                />
              </label>
              <br />
              <button className='btn'>Log In</button>
            </form>
          </div>
        </div>
        {error && (
          <>
            <img src={cancel_img} className='cancelImg' alt='' />
            <p className='error_msg'>Wrong Email and Password!!!!</p>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
