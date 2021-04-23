import React from 'react';
import { Link } from "gatsby";

import Hr from './hr';
import Button from './button';
import Center from './center';

const clickHandler = () => {
  const root = document.documentElement;
  root.setAttribute('theme', 'dark');
};

const Header = () => {
  return (
    <header className='header'>
      <Center align='flex-start'>
        <h1>
          <Link to="/">Chris Romero</Link>
        </h1>
        <h2>
          <Link to="/">Front-End Developer</Link>
        </h2>
        <Hr style={{ marginTop: "var(--vertical-rhythm)" }} />
      </Center>

    </header>
  );
};

export default Header;
