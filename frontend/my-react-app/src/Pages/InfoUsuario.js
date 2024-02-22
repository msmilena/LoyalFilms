import React, { useState, useEffect } from 'react';
import Navbar from '../Componentes/NavBar.jsx';
//import Section from '../Componentes/Section.jsx';
//import MainSection from '../Componentes/MainSection.jsx';
//import Footer from '../Componentes/Footer.jsx';
//import Login from '../Pages/Login.js';
import '../Componentes/Homepage.css';
import imgPerfil from '../img/imgPerfil.jpg';
import "../css/InfoUsuario.css";
function InfoUsuario() {

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    return (
        //<div className={`homePage ${showLoginPopup ? 'popupActive' : ''}`}>
        //    {showLoginPopup && <Login onClose={() => setShowLoginPopup(false)} />}
        <div>
            <header>
                <Navbar showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup} />
            </header>
            <main class="mainPerfil">
                <div class="navPerfil">
                    <img src={imgPerfil} class="imgPerfil" alt="imgPerfil" />
                    <p class="nombrePerfil">ANAISBT</p>
                <button class="btnEditarPerfil">Editar Perfil</button>
            </div>
            </main>
        </div>
    );
}

export default InfoUsuario;
