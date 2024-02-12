import React, { useState, useEffect } from 'react';
import Navbar from '../Componentes/NavBar.jsx';
import Section from '../Componentes/Section.jsx';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Verificar autenticación al cargar la página
    //verificarAutenticacion();

    // Obtener el catálogo de películas si está autenticado
   // if (localStorage.getItem('token')) {
      obtenerCatalogoPeliculas();
    //}
  });

  // function verificarAutenticacion() {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //       console.log("No hay token")
  //     // Redirige a la página de autenticación si no hay token
  //     window.location.href = '/login';
  //   }
  // }

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

        <Section sectionName="Tendencias" />
        <Section sectionName="Nuevos" />
      </main>
    </div>
  );
}

export default HomePage;
