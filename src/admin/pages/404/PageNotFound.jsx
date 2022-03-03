import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";
import Sidebar from "../../components/sideBar/Sidebar";
import "./pageNotFound.css";
import { useNavigate } from "react-router-dom";

function PageNotFound({ admin, isAdmin, setIsAdmin, token, setToken }) {
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
  return (
    <div className='pageNotFound'>
      <Sidebar />
      <div className='pageNotFound_container'>Page Not Found </div>
    </div>
  );
}

export default PageNotFound;
