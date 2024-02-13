import { React,useState, useEffect } from 'react';
import { MovieCard } from "../Componentes/MovieCard.jsx";
import  ReviewList  from "../Componentes/ReviewList.jsx";
function Resena(props) {
    const [movies, setMovies] = useState([]);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
      fetch('http://localhost:5000/prueba') // Reemplaza con la URL correcta de tu API Flask
        .then(response => response.json())
        .then(data => setMovies(Array.isArray(data) ? data : [data]))
        .catch(error => console.error('Error fetching movies:', error));

        const dummyReviews = [
            { userId: 1, id: 1, movieId: 1, username: 'Usuario1', rating: 4, text: 'Me encantó esta película.' },
            { userId: 2, id: 2, movieId: 1, username: 'Usuario2', rating: 3, text: 'Buena trama, pero el final fue predecible.' },
            { userId: 3, id: 3, movieId: 2, username: 'Usuario3', rating: 5, text: 'Increíble, no puedo esperar para verla de nuevo.' },
            // Agrega más reseñas según sea necesario
        ];

        setReviews(dummyReviews);
    }, []);

    return (
        <div>
          <header>
            <h1>Película</h1>
          </header>
          <main>
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
              <ReviewList reviews={reviews} />
          </main>
        </div>
      );
      
}

export default Resena;