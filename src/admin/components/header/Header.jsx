import React from "react";
import { useNavigate } from "react-router-dom";
import "../../adminStyles.css";
import "./header.css";

function Header({ setIsAdmin }) {
  const navigate = useNavigate();
  return (
    <div className='admin_header'>
      <h2>ADMIN PANEL</h2>
      <button
        onClick={() => {
          navigate("/");
          localStorage.removeItem("webbpins_admin_token");
          setIsAdmin(false);
        }}
        className='btn'
      >
        Back To Website
      </button>
    </div>
  );
}

export default Header;
