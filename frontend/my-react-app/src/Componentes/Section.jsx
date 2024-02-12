import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import { MoviesGrid } from './MoviesGrid';
import Fuego from '../img/Fuego.png';
import './Section.css';
const Section = ({ sectionName }) => {

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
    <Element name={sectionName} className="section">
      <div className="section-header">
        <div className='contenedor-img'>
          <img src={Fuego} alt="Fuego" />
        </div>
        <h2>{sectionName}</h2>
      </div>
      
        <MoviesGrid movies={movies} />
    </Element>
  );
};

Section.propTypes = {
  sectionName: PropTypes.string.isRequired,
};

export default Section;
