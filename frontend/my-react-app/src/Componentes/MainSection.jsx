import React from 'react';
import { Element } from 'react-scroll';
import FotoPortada from '../img/Portada.png';
import '../Componentes/MainSection.css';
const MainSection = () => {
    return(
        <Element name="main-section" className="main-section">
        <section className="main-section">
            
            <div className="main-section__text">
                <div className="main-section__text__title__black">Encuentra las mejores</div>
                <div className="main-section__text__title__color">Películas y más</div>
                <p className="main-section__text__description">Disfruta de las mejores películas y series en un solo lugar</p>
            </div>
            <div className="main-section__img">
            <img src={FotoPortada} alt="Portada"/>
            </div>
            
        </section>
        </Element>
    )
}


export default MainSection;