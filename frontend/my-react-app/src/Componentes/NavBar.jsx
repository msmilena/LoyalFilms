import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../img/Logo.png';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    // Puedes agregar lógica de logout aquí, como limpiar el token en localStorage
    localStorage.removeItem('token');
    // Redirige a la página de login después del logout
    window.location.href = '/';
  };

  return (
    <nav>
      <img src={logo} alt="Logo" />
      <ul>
        <li>
          <RouterLink to="/">Inicio</RouterLink>
        </li>
        <li>
          <ScrollLink to="Tendencias" smooth={true} duration={500}>Tendencias</ScrollLink>
        </li>

        <li>
          <ScrollLink to="Nuevos" smooth={true} duration={500}>Nuevos</ScrollLink>
        </li>

        {!isLoggedIn && (
          <li>
            <RouterLink to="/login">Login</RouterLink>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <RouterLink  onClick={handleLogout}>Logout</RouterLink>
          </li>
        )}
      </ul>
    </nav>

  );
};

export default Navbar;
