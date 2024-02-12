import React, {useState} from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link as RouterLink} from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../img/Logo.png';
import './NavBar.css';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const[click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav>
      <img src={logo} alt="Logo" />
      <div className="hamburger" onClick={handleClick}>
      {click ? (<FaTimes size={30} style={{ color: '#444444' }} />)
                        : (<FaBars size={30} style={{ color: '#444444' }} />)}
      </div>
      <ul className={click ? "navbar-menu active" : "navbar-menu"}>
        <li>
          <RouterLink to="/" onClick={closeMenu}>Inicio</RouterLink>
        </li>
        <li>
          <ScrollLink to="Tendencias" onClick={closeMenu}
          smooth={true} duration={500} spy={true} hashSpy={true}
          exact='true' offset={50}
          >Tendencias</ScrollLink>
        </li>

        <li> 
        <ScrollLink to="Nuevos" onClick={closeMenu}
          smooth={true} duration={500} spy={true} hashSpy={true}
          exact='true' offset={50}
          >Nuevos</ScrollLink>
        </li>

        {!isLoggedIn && (
          <li> 
            <RouterLink to="/login" onClick={closeMenu}>Login</RouterLink>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <RouterLink onClick={handleLogout}>Logout</RouterLink>
          </li>
        )}
      </ul>
    </nav>

  );
};

export default Navbar;
