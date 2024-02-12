import React from 'react';
import '../Componentes/Footer.css';
import Fondo from '../img/Fondo.png';
import { Link as RouterLink} from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
        <img src={Fondo} alt="fondo" />

      <div class="contenido-footer">
     
            <ul class="botones">
                <li>
                    <RouterLink to="/">Inicio</RouterLink>
                </li>
                <li>
                    <RouterLink to="/register">Regístrate</RouterLink>
                </li>
                <li> 
                    <RouterLink to="/login" >Iniciar Sesión</RouterLink>
                </li>
            </ul>
     
        </div>
    </footer>
  );
};

export default Footer;
