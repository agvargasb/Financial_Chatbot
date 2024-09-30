import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import {logo} from "../../assets";
import { Link } from "react-router-dom"
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="fAI__navbar">
      <div className="fAI__navbar-links">
        <div className="fAI__navbar-links_logo">
        <a href="/"> 
          <img src={logo} alt="fAInancial" className="w-[100px] h-[110px]" /></a>
        </div>
        <div className="fAI__navbar-links_container">
          <p><a href="/#home">Home</a></p>
          <Link to="/chat"><p>ChatBot</p></Link>
          <p><a href="/#clients">Clients</a></p>
        </div>
      </div>
      
      <div className="fAI__navbar-sign">
      <Link to="/sign-up"> 
        <p>Sign in</p>
        </Link>
        <Link to="/sign-up"> 
        <button type="button">Sign up</button>
        </Link>
      </div>
      
      <div className="fAI__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="fAI__navbar-menu_container scale-up-center">
          <div className="fAI__navbar-menu_container-links">
          <p><a href="#home">Home</a></p>
          <p><a href="#features">Features</a></p>
          <p><a href="#product">Product</a></p>
          <p><a href="#clients">Clients</a></p>
          </div>
          <div className="fAI__navbar-menu_container-links-sign">
            <p>Sign in</p>
            <Link to="/sign-up">
              <button type="button" href="/sing-up">Sign up</button>
            </Link>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
