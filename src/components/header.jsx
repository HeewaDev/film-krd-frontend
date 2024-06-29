// src/components/Header.js
/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header>
    <nav>
      <ul className="navbar">
        <li><Link to="/">سەرەکی</Link></li>
        <li><Link to="/films">فیلمەکان</Link></li>
        <li><Link to="/companies">کۆمپانیاکان</Link></li>
        <li><Link to="/casts">هەڵبژاردەکان</Link></li>
        <li><Link to="/crew">دەستە</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
