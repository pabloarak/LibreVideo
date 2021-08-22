import React from 'react';
import '../assets/styles/components/NotFound.scss';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <>
    <a href='https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjU8I6kvsbwAhXd8HMBHYpgBgU4ChAWMAd6BAgGEAM&url=https%3A%2F%2Fwww.ftcab.com%2Franchi-to-kolkata-taxi.aspx&usg=AOvVaw1M8U0bTfqd9yaEEZQk0NHC' target='_blank' rel='noreferrer'>
      <header className='top-header' />
      <div>
        <div className='starsec' />
        <div className='starthird' />
        <div className='starfourth' />
        <div className='starfifth' />
      </div>
      <div className='lamp__wrap'>
        <div className='lamp'>
          <div className='cable' />
          <div className='cover' />
          <div className='in-cover'>
            <div className='bulb' />
          </div>
          <div className='light' />
        </div>
      </div>
      <section className='error'>
        <div className='error__content'>
          <div className='error__message message'>
            <h1 className='message__title'>Page Not Found</h1>
            <p className='message__text'>We&apos;re sorry, the page you were looking for isn&apos;t found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
          </div>
          <div className='error__nav e-nav'>
            <Link to='/' className='e-nav__link' />
          </div>
        </div>
      </section>
    </a>
  </>
);

export default NotFound;
