/* eslint-disable jsx-a11y/anchor-is-valid */
import './navBar.css';

import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export interface NavBarProps {
  img: string;
  alt: string;
  item1: string;
  item2?: string;
  item3?: string;
  item4?: string;
  item5?: string;
  subitem1?: string;
  subitem2?: string;
  subitem3?: string;
}

export const NavBar = (props: NavBarProps) => {
  const navigate = useNavigate();
  const { img, alt, item1, item2, item3, item4 } = props;

  const navRef = useRef<HTMLDivElement>(null);

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle('responsive_nav');
    }
  };

  return (
    <div>
      <header>
        <img
          src={`${process.env.PUBLIC_URL + img}`}
          alt={alt}
          onClick={() => navigate('/')}
        />
        <div className="separator"></div>

        <nav ref={navRef}>
          <h1 onClick={() => navigate('/')}>{item1}</h1>
          <a onClick={() => navigate('/restaurant')}>{item2}</a>
          <a onClick={() => navigate('/offers')}>{item3}</a>
          <a onClick={() => navigate('/booking')}>{item4}</a>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    </div>
  );
};
