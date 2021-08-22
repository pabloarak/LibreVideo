// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutRequest } from '../actions';
import gravatar from '../utils/gravatar';
import '../assets/styles/components/Header.scss';
// Images
import logo from '../assets/static/logo.png';
import userProfile from '../assets/static/user.png';

const Header = (props) => {

  const { user } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    props.logoutRequest({});
  };

  // const headerClass = classNames('header', {
  //   isLogin,
  //   isRegister,
  // });

  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__img' src={logo} alt='Libre Video' />
      </Link>

      <div className='header__menu'>
        <div className='header__menu--profile'>
          {hasUser ?
            <img src={gravatar(user.email)} alt={user.email} /> :
            <img src={userProfile} alt='User' />}
          <p>Perfil</p>
        </div>
        <ul>

          {hasUser ?
            <li><a href='/'>{user.name}</a></li> :
            null}

          {hasUser ? (
            <li>
              <Link to='/login' onClick={handleLogout}>
                Cerrar Sesión
              </Link>
            </li>
          ) : (
            <li>
              <Link to='/login'>
                Iniciar Sesión
              </Link>
            </li>
          )}

        </ul>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  logoutRequest: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
