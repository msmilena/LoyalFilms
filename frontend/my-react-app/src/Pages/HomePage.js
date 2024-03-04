import React, { useState, useEffect } from 'react';
import Navbar from '../Componentes/NavBar.jsx';
import Section from '../Componentes/Section.jsx';
import MainSection from '../Componentes/MainSection.jsx';
import Footer from '../Componentes/Footer.jsx';
import Login from '../Pages/Login.js';
import Register from './Register.js';
import '../Componentes/Homepage.css';

function HomePage() {

  useEffect(() => {
    obtenerNuevasPeliculas();
    obtenerTendencias();
  }, []);

  const [NuevasPeliculas, setNuevasPeliculas] = useState([]);

  const [Tendencias, setTendencias] = useState([]);
  
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  
  const url = "https://loyalfilms.onrender.com"

  function obtenerNuevasPeliculas() {
    const token = localStorage.getItem('token');
    fetch(url +'/movies/nuevas', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

      .then(response => response.json())
      .then(data => setNuevasPeliculas(data))
      .catch(error => console.error('Error fetching movies:', error));
  }


  function obtenerTendencias() {
    const token = localStorage.getItem('token');
    fetch( url +'/movies/tendencias', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

      .then(response => response.json())
      .then(data => setTendencias(data))
      .catch(error => console.error('Error fetching movies:', error));
  }



  return (
    <div className={`homePage ${showLoginPopup || showRegisterPopup ? 'popupActive' : ''}`}>
      

      {showLoginPopup && <Login onClose={() => setShowLoginPopup(false)} onRegisterClick={() => {setShowRegisterPopup(true); setShowLoginPopup(false); }} />} {/* Modifica el componente de Login para manejar el clic en el enlace de registro */}
      {showRegisterPopup && <Register onCloseRegister={() => setShowRegisterPopup(false)} onLoginClick={()=>{setShowLoginPopup(true); setShowRegisterPopup(false);}}/>} {/* Muestra el componente de registro si showRegisterPopup es true */}
      
      <header>
        <Navbar showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup}/>
      </header>
      <main>
        
        <div className={showLoginPopup ? 'blocked-content' : ''}>
          <MainSection />
          <Section sectionName="Tendencias" movies={Tendencias} limit={8}/>
          <Section sectionName="Nuevos" movies={NuevasPeliculas} limit={8}/>
          <Footer showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup} onRegisterClick={() => {setShowRegisterPopup(true); setShowLoginPopup(false); }} />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
