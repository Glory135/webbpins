import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sideBar/Sidebar";
import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";
import "./register.css";
import axios from "axios";
import { toast } from "react-toastify";

function Register({ admin, isAdmin, setIsAdmin, token, setToken }) {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    // admin validation start
    const tok = JSON.parse(localStorage.getItem("webbpins_admin_token"));
    setToken(tok);
    if (tok) {
      const decoded_token = jwt_decode(tok);
      const current_time = new Date().getTime();
      if (decoded_token.exp * 1000 < current_time) {
        navigate("/");
      } else {
        if (admin) {
          const decodedTok = jwt.decode(tok);
          if (decodedTok.id === admin._id) {
            setIsAdmin(true);
          } else {
            navigate("/");
            setIsAdmin(false);
          }
        } else {
          navigate("/");
        }
      }
    } else {
      navigate("/");
    }
    // admin validation end
  }, [isAdmin, setIsAdmin, token, setToken, admin, navigate]);

  const notifySuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const notifyError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAdmin = {
      id,
      name,
      email,
      password,
    };
    try {
      await axios.post(
        "https://webpins.onrender.com/api/admin/register",
        newAdmin,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      notifySuccess("Added Successfully!!!");
      navigate("/admin/profile");
    } catch (err) {
      notifyError("Error!!!");
      console.log(err);
    }
  };

  return (
    <div className='admin_register'>
      <Sidebar />
      <div className='admin_register_container'>
        <div className='admin_form_container'>
          <div className='admin_form_container_2'>
            <div className='admin_form_label'>
              <h2>Admin Register</h2>
            </div>
            <form
              className='admin_login_form register_form'
              onSubmit={handleSubmit}
            >
              <label>
                <h3>ID:</h3>
                <input
                  type='number'
                  name='id'
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  placeholder='ID....'
                  required
                />
              </label>

              <label>
                <h3>Name:</h3>
                <input
                  type='text'
                  name='name'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder='Name....'
                  required
                />
              </label>

              <label>
                <h3>Email:</h3>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder='Email......'
                  required
                />
              </label>

              <label>
                <h3>Password:</h3>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder='Password.....'
                  required
                />
              </label>
              <br />
              <button className='btn'>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
