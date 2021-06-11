import React from 'react';
import { Link } from "gatsby";

import Hr from './hr';
import Button from './button';
import Logo from '../images/logo.inline.svg';

const clickHandler = () => {
  const root = document.documentElement;
  root.setAttribute('theme', 'dark');
};

const Header = () => {
  return (
    <header className='header'>
      <div>
        <h1>
          <Link to="/">
            <Logo />
          </Link>
        </h1>

      </div>

    </header>
  );
};

export default Header;
