import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MoviesGrid } from "../Componentes/MoviesGrid";
import Navbar from '../Componentes/NavBar.jsx';
import Footer from '../Componentes/Footer.jsx';
import '../Componentes/Resultados.css';

export function Resultados() {
  const { palabra } = useParams(); // Obtiene la palabra clave de la URL
  const [searchResults, setSearchResults] = useState([]);

  // Función para buscar películas por la palabra clave
  const buscarPeliculas = async () => {
    try {
    const response = await fetch(`http://localhost:5000/movies/buscar?palabra=${palabra}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Error fetching movies:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    buscarPeliculas();
  }, [palabra]); // Vuelve a ejecutar la búsqueda cuando la palabra clave cambia

  return (
    <div>
        <header>
            <Navbar />
        </header>
        <main style={{marginTop: '100px'}}>
            <h2>Resultados de la búsqueda: "{palabra}"</h2>
            <MoviesGrid movies={searchResults} />
            <Footer />
        </main>
      
    </div>
  );
}

export default Resultados;