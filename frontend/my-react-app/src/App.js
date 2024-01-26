import React, { useState, useEffect } from 'react';
import { MoviesGrid } from './Componentes/MoviesGrid';
function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/') // Reemplaza con la URL correcta de tu API Flask
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div>
      <header>
        <h1>Movie App</h1>
      </header>
      <main>
        <MoviesGrid movies={movies} />
      </main>
    </div>
  );
}

export default App;
