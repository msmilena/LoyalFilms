import React, { useState, useEffect } from "react";
import Navbar from "../Componentes/NavBar.jsx";
import { useLocation } from "react-router-dom";
import Footer from "../Componentes/Footer.jsx";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../css/Movie.css";
import { object } from "prop-types";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegShareFromSquare } from "react-icons/fa6";
import Fuego from '../img/Fuego.png';
import RatingStar from "../Componentes/Rating.jsx";

function Movie() {
  const [infoPelicula, setinfoPelicula] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const imageUrl = "https://image.tmdb.org/t/p/w342" + infoPelicula.poster_path;
  const location = useLocation();

  useEffect(() => {
    const id = new URLSearchParams(location.search).get("id");
    if (id) {
      obtenerPelicula(id);
    } else {
      alert("No se encontró el ID en la URL");
    }
  }, [location.search]);

  function obtenerPelicula(id) {
    fetch(`http://localhost:5000/movies/informacion?id=${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setinfoPelicula(data);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }
  console.log(infoPelicula);

  return (
    <div>
      <header>
        <Navbar
          showLoginPopup={showLoginPopup}
          setShowLoginPopup={setShowLoginPopup}
        />
      </header>
      <main className="mainDiv">
        <div className="contenedorMovie">
          <div className="infoMovie1">
            <div className="contenedorImg">
              <img src={imageUrl} alt="Poster" />
            </div>
            <div className="contenedorBotones">
              <div className="fila">
                <div className="boton">
                  <MdOutlineRemoveRedEye
                    size={50}
                    style={{ color: "#C40E61" }}
                  />
                  Ver
                </div>
                <div className="boton">
                  <FaRegHeart size={50} style={{ color: "#C40E61" }} />
                  Me gusta
                </div>
                <div className="boton">
                
                  <IoIosAddCircleOutline
                    size={50}
                    style={{ color: "#C40E61" }}
                  />
                  Añadir a lista
                </div>
                          </div>
               <div className="fila">
                 <div className="boton">
                                  <RatingStar  /> 
                 </div>
                </div>            
               <div className="fila" style={{ borderBottom: '0px solid #00000047', paddingBottom: '0px' }}>
                <div className="boton">
                
                <FaRegShareFromSquare size={50} style={{ color: "#C40E61" }} />
                Compartir
                </div>
              </div>
            </div>
          </div>
          <div className="infoMovie2">
            <h1 className="titulo_pelicula">{infoPelicula.title}</h1>
            <p className="info_titulo">Calificación</p>
            <div className="contenedorRating">
              <CircularProgressbar
                value={infoPelicula.porcentaje}
                text={`${infoPelicula.puntaje}`}
                background
                strokeWidth={15}
                styles={{
                  path: {
                    stroke: `rgba(34, 3, 255, ${
                      infoPelicula.porcentaje / 100
                    })`,
                    transition: "stroke-dashoffset 0.5s ease 0s",
                  },
                  trail: {
                    stroke: "#140294",
                  },
                  text: {
                    fill: "#FFFFFF",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  },
                  background: {
                    fill: "#000000",
                  },
                }}
              />
            </div>
            <p>{infoPelicula.year_release}</p>
            <p className="info_titulo">Dirigida por</p>
            <p> {infoPelicula.director}</p>
            <p className="info_titulo">Reparto</p>
            <p>
              {infoPelicula.actor1}, {infoPelicula.actor2},{" "}
              {infoPelicula.actor3}
            </p>
            <p className="info_titulo">Sinopsis</p>
            <p>{infoPelicula.overview}</p>
          </div>
        </div>
        <div className="section-header">
        <div className='contenedor-img'>
          <img src={Fuego} alt="Fuego" />
        </div>
        <h2><span>Reseñas</span></h2>
           
      </div>
        <div className="mainResena">
        

  <div className="botonResena">
    <button>
      <IoIosAddCircleOutline size={30} style={{ color: "#E8E8E8" }} />
      Añadir Reseña
    </button>
</div>
      

        </div>

        
        <Footer
          showLoginPopup={showLoginPopup}
          setShowLoginPopup={setShowLoginPopup}
        />
      </main>
    </div>
  );
}

export default Movie;
