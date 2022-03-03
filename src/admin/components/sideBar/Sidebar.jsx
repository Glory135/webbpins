import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Category, Home, Person, PostAdd, PowerOff } from "@material-ui/icons";
import "./sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const navigatation = useLocation();
  const location = navigatation.pathname.split("/")[2];

  const handleLogout = () => {
    localStorage.removeItem("webbpins_admin_token");
    navigate("/");
  };
  return (
    <div className='admin_sidebar'>
      <div className='admin_sidebar_wrapper'>
        <ul className='admin_sidebar_list'>
          <Link to='/admin/dashboard' className='Link'>
            <li
              className={
                location === "dashboard"
                  ? "admin_sidebar_list_item active"
                  : "admin_sidebar_list_item"
              }
            >
              <Home className='admin_sidebar_icon' />
              <span className='admin_sidebar_text'>Dashboard</span>
            </li>
          </Link>

          <Link to='/admin/create' className='Link'>
            <li
              className={
                location === "create"
                  ? "admin_sidebar_list_item active"
                  : "admin_sidebar_list_item"
              }
            >
              <PostAdd className='admin_sidebar_icon' />
              <span className='admin_sidebar_text'>Post Template</span>
            </li>
          </Link>

          <Link to='/admin/cats' className='Link'>
            <li
              className={
                location === "cats"
                  ? "admin_sidebar_list_item active"
                  : "admin_sidebar_list_item"
              }
            >
              <Category className='admin_sidebar_icon' />
              <span className='admin_sidebar_text'>Categories</span>
            </li>
          </Link>

          <Link to='/admin/profile' className='Link'>
            <li
              className={
                location === "profile" || location === "register"
                  ? "admin_sidebar_list_item active"
                  : "admin_sidebar_list_item"
              }
            >
              <Person className='admin_sidebar_icon' />
              <span className='admin_sidebar_text'>Admin Profile</span>
            </li>
          </Link>

          <li onClick={handleLogout} className='admin_sidebar_list_item'>
            <PowerOff className='admin_sidebar_icon' />
            <span className='admin_sidebar_text'>Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
