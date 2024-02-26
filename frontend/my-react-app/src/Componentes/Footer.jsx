import React from 'react';
import '../Componentes/Footer.css';
import Fondo from '../img/Fondo.png';
import { Link as RouterLink} from 'react-router-dom';

const Footer = ({ showLoginPopup, setShowLoginPopup, onRegisterClick }) => {
    const isLoggedIn = !!localStorage.getItem('token');
    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.href = '/';
    };

  return (
    <footer>
        <img src={Fondo} alt="fondo" />

      <div className="contenido-footer">
     
            <ul className="botones">
                <li>
                    <RouterLink to="/">Inicio</RouterLink>
                </li>
                <li>
                <a href="#" className="" onClick={onRegisterClick}>Regístrate</a>
                </li>

                {!isLoggedIn && (
                  <li> 
                    <button className="abrirLogin" onClick={() => setShowLoginPopup(true)}>Iniciar Sesión</button>
                  </li>
                )}

                {isLoggedIn && (
                  <li>
                    <RouterLink onClick={handleLogout}>Cerrar Sesión</RouterLink>
                  </li>
                )}

            </ul>
     
        </div>
    </footer>
  );
};

export default Footer;
