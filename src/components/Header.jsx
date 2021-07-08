// Libraries
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Header.scss'
// Images
import logo from '../assets/static/logo.png';
import userProfile from '../assets/static/user.png';

const Header = () => (
    <header className="header">
        <Link to="/">
          <img className="header__img" src={logo} alt="Libre Video"/>
        </Link>
        
        <div className="header__menu">
          <div className="header__menu--profile">
            <img src={userProfile} alt="User"/>
            <p>Perfil</p>
          </div>
          <ul>
            <li><a href="/">Cuenta</a></li>
            <li>
              <Link to="/login">
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </div>
    </header>
);

export default Header;