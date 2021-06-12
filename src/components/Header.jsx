// Libraries
import React from 'react';
import '../assets/styles/components/Header.scss'
// Images
import logo from '../assets/images/logo.png';
import userProfile from '../assets/images/user.png';

const Header = () => (
    <header className="header">
        <img className="header__img" src={logo} alt="Platzi Video"/>
        <div className="header__menu">
          <div className="header__menu--profile">
            <img src={userProfile} alt="User"/>
            <p>Perfil</p>
          </div>
          <ul>
            <li><a href="/">Cuenta</a></li>
            <li><a href="/">Cerrar Sesión</a></li>
          </ul>
        </div>
    </header>
);

export default Header;