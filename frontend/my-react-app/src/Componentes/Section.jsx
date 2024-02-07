import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import { MoviesGrid } from './MoviesGrid';
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
      <h2>{sectionName}</h2>
        <MoviesGrid movies={movies} />
    </Element>
  );
};

Section.propTypes = {
  sectionName: PropTypes.string.isRequired,
};

export default Section;
