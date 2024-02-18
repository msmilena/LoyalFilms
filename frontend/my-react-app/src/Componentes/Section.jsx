import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import { MoviesGrid } from './MoviesGrid';
import Fuego from '../img/Fuego.png';
import './Section.css';
const Section = ({ sectionName, movies, limit}) => {
  const limitedMovies = limit? movies.slice(0, limit): movies;
  return (
    <Element name={sectionName} className="section">
      <div className="section-header">
        <div className='contenedor-img'>
          <img src={Fuego} alt="Fuego" />
        </div>
        <h2>{sectionName}</h2>
      </div>
      
        <MoviesGrid movies={limitedMovies} />
    </Element>
  );
};

Section.propTypes = {
  sectionName: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  limit: PropTypes.number,
};

export default Section;
