import React, { useState, useEffect } from 'react';
import Navbar from '../Componentes/NavBar.jsx';
import Section from '../Componentes/Section.jsx';
import { useNavigate } from 'react-router-dom';
//import MainSection from '../Componentes/MainSection.jsx';
import Footer from '../Componentes/Footer.jsx';
//import Login from '../Pages/Login.js';
import '../Componentes/Homepage.css';
import imgPerfil from '../img/imgPerfil.jpg';
import "../css/InfoUsuario.css";
function InfoUsuario() {


    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [peliculasFavoritas, setpeliculasFavoritas] = useState([]);

    useEffect(() => {
        obtenerPeliculasFavoritas();
    }, []);

    function obtenerPeliculasFavoritas() {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/movies/tendencias', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

            .then(response => response.json())
            .then(data => setpeliculasFavoritas(data))
            .catch(error => console.error('Error fetching movies:', error));
    }

    const navigate = useNavigate();
    const editarPerfil = () => {
        navigate(`/perfil`);
    };

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
                    <button class="btnEditarPerfil" onClick={editarPerfil}>Editar Perfil</button>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <Section sectionName="Peliculas Favoritas" movies={peliculasFavoritas} limit={5} />
                    {/*<Section sectionName="Mis Listas" movies={Listas} limit={4} />*/}
                </div>
                <Footer showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup} />
            </main>
            
        </div>
    );
}

export default InfoUsuario;
