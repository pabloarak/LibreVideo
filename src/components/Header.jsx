import React from 'react';

const Header = () => (
    <header className="header">
        <img className="header__img" src="../assets/img/logo.png" alt="Platzi Video"/>
        <div className="header__menu">
          <div className="header__menu--profile">
            <img src="../assets/img/user.png" alt="User"/>
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