import React, { useState, useEffect } from 'react';
import Navbar from '../Componentes/NavBar.jsx';
import Section from '../Componentes/Section.jsx';
import MainSection from '../Componentes/MainSection.jsx';
import '../Componentes/Homepage.css';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
      obtenerCatalogoPeliculas();
  });

  function obtenerCatalogoPeliculas() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/movies', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <MainSection />
        <Section sectionName="Tendencias" />
        <Section sectionName="Nuevos" />
      </main>
    </div>
  );
}

export default HomePage;
