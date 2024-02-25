import React, { useState, useEffect } from 'react';
import Navbar from '../Componentes/NavBar.jsx';
import Section from '../Componentes/Section.jsx';
import MainSection from '../Componentes/MainSection.jsx';
import Footer from '../Componentes/Footer.jsx';
import Login from '../Pages/Login.js';
import '../Componentes/Homepage.css';

function HomePage() {

  useEffect(() => {
    obtenerNuevasPeliculas();
    obtenerTendencias();
  }, []);

  const [NuevasPeliculas, setNuevasPeliculas] = useState([]);

  const [Tendencias, setTendencias] = useState([]);
  
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  function obtenerNuevasPeliculas() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/movies/nuevas', {
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
    fetch('http://localhost:5000/movies/tendencias', {
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
    <div className={`homePage ${showLoginPopup ? 'popupActive' : ''}`}>
      {showLoginPopup && <Login onClose={() => setShowLoginPopup(false)} />}

      <header>
        <Navbar showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup}/>
      </header>
      <main>
        
        <div className={showLoginPopup ? 'blocked-content' : ''}>
          <MainSection />
          <Section sectionName="Tendencias" movies={Tendencias} limit={8}/>
          <Section sectionName="Nuevos" movies={NuevasPeliculas} limit={8}/>
          <Footer showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup}/>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
