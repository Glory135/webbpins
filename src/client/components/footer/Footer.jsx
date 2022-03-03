import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.jpg";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className='footer_container'>
        <div className='logo_container'>
          <Link className='Link ' to='/'>
            <img src={logo} className='footer_logo' alt='' />
          </Link>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus
            doloremque velit sequi facere, ducimus dicta ad praesentium
            consequatur quisquam dignissimos!
          </p>
          <h5>
            &copy;copyrite Webbpins 2021 all rights reserved developed by Glory
          </h5>
        </div>
        <div className='links_container'>
          <h1>Quick Links</h1>
          <ul>
            <Link className='Link' to='/'>
              <li>HOME</li>
            </Link>
            <Link className='Link' to='/about'>
              <li>ABOUT</li>
            </Link>
            <Link className='Link' to='/contact'>
              <li>CONTACT</li>
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
