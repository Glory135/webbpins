import React from "react";
import { Link } from "react-router-dom";
import img from "../../images/hero.jpeg";
import "./about.css";
import "../../styles.css";

function About() {
  return (
    <div className='about'>
      <div className='about_top'>
        <h1>About us</h1>
      </div>
      <div className='about-showcase'>
        <div className='about-showcase-one'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ex,
            amet dignissimos asperiores, voluptates aut perspiciatis tempora
            deleniti veritatis assumenda minima voluptatibus eligendi aliquid
            fuga maxime nesciunt, culpa saepe adipisci! Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Consectetur molestiae odio
            recusandae. Saepe, a aliquid adipisci repudiandae odio alias optio
            quos aut, nesciunt commodi inventore doloremque at aspernatur
            quisquam deleniti?
          </p>
          <Link to='/contact' className='Link'>
            <button className='btn about-btn'>Contact us</button>
          </Link>
        </div>
        <div className='about-showcase-two'>
          <img src={img} alt='' />
        </div>
      </div>
    </div>
  );
}

export default About;
