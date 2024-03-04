import React, { useState, useEffect } from "react";
import Navbar from "../Componentes/NavBar.jsx";
import { useLocation } from "react-router-dom";
import Footer from "../Componentes/Footer.jsx";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../css/Movie.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegShareFromSquare } from "react-icons/fa6";
import Fuego from "../img/Fuego.png";
import { FaStar } from "react-icons/fa";
import { LuUser2 as User } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import PopUpLista from "./PopUpLista";
import PopUpNuevaLista from "./PopUpNuevaLista";
import PopUpNuevaResena from "./PopUpNuevaResena";
import PopUpEditarResena from "./PopUpEditarResena.js";

function Movie() {
  const [infoPelicula, setinfoPelicula] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const imageUrl = "https://image.tmdb.org/t/p/w342" + infoPelicula.poster_path;
  const location = useLocation();
  const [showListPopUp, setshowListPopUp] = useState(false);
  const [showNuevaLista, setshowNuevaLista] = useState(false);
  const [showNuevaResena, setshowNuevaResena] = useState(false);
  const [showEditarResena, setshowEditarResena] = useState(false);
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
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const numeroDeResenas = 2; // Puedes ajustar esto según el número deseado de repeticiones
  console.log("a",showListPopUp )
  const resenas = Array.from({ length: numeroDeResenas }, (_, index) => (
    <div className="resenaContenedor" key={index}>
      <div className="fila">
        <div className="usuarioResena">
          <User size={30} style={{ color: "#C40E61", marginRight: "5px" }} />
          Anónimo
        </div>
        <div className="fecha">4/01/2024</div>
      </div>

      <div className="calificacionResena">
        <p>Calificación </p>
        <div className="contenedorRating">
          <CircularProgressbar
            value={infoPelicula.porcentaje}
            text={`${infoPelicula.puntaje}`}
            background
            strokeWidth={15}
            styles={{
              path: {
                stroke: `rgba(34, 3, 255, ${infoPelicula.porcentaje / 100})`,
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
      </div>
      <div className="comentario">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras metus
        nisi, aliquam at libero bibendum, commodo condimentum erat. Sed
        pellentesque est dolor. Sed sed lorem semper, faucibus magna eu, aliquam
        odio. 
      </div>
      <div className="fila">
        <div className="botonResena">
          <button>
            <FaRegShareFromSquare style={{ color: "#E8E8E8", size: "30px" }} />
            Compartir
          </button>
        </div>
        <div className="botonResena" >
          <button onClick={() => setshowEditarResena(true)}>
            <FaRegEdit style={{ color: "#E8E8E8", size: "30px" }} />
            Editar Reseña
          </button>
        </div>
        <div className="botonResena">
          <button>
            <FaRegTrashAlt style={{ color: "#E8E8E8", size: "30px" }} />
            Eliminar Reseña
          </button>
        </div>
      </div>
    </div>
  ));
  return (
    <div className={`page ${showLoginPopup || showListPopUp || showNuevaLista || showNuevaResena || showEditarResena? 'popupActive' : ''}`}>
      {showListPopUp && <PopUpLista onCloseList={() => setshowListPopUp(false)} onNuevoClick={() => {setshowNuevaLista(true); setshowListPopUp(false); setShowLoginPopup(false)}}  />} 
      {showNuevaLista && <PopUpNuevaLista onCloseNueva={() => setshowNuevaLista(false)} />}
      {showNuevaResena && <PopUpNuevaResena onCloseResena={() => setshowNuevaResena(false)} />}
      {showEditarResena && <PopUpEditarResena onCloseEdit={() => setshowEditarResena(false)} />}
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
                  <div className="contenedorIcono">
                    <MdOutlineRemoveRedEye
                      style={{
                        color: "#C40E61",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  Ver
                </div>
                <div className="boton">
                  <div className="contenedorIcono">
                    <FaRegHeart
                      style={{
                        color: "#C40E61",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  Me gusta
                </div>
                <div className="boton">
                  <div className="contenedorIcono abrirLogin"
                  onClick= {() => {
                    if (window.innerWidth <= 600) {
                      setshowListPopUp(false);
                      console.log("show:", showListPopUp);
                    } else {
                      setshowListPopUp(true);
                    }
                  }}>
                    <IoIosAddCircleOutline
                      style={{
                        color: "#C40E61",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    
                  </div>
                  Añadir a lista
                </div>
              </div>

              <div className="filaRating">
                <div className="ratingEstrellas">
                  {[...Array(5)].map((star, index) => {
                    const ratingActual = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingActual}
                          onClick={() => setRating(ratingActual)}
                        />
                        <FaStar
                          className="star"
                          style={{ width: "100%", height: "100%" }}
                          color={
                            ratingActual <= (hover || rating)
                              ? "#a69bff"
                              : "#d6d6d6"
                          }
                          onMouseEnter={() => setHover(ratingActual)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
                Calificar
              </div>
              <div className="fila" style={{ justifyContent: "center" }}>
                <div className="boton">
                  <div className="contenedorIcono">
                    <FaRegShareFromSquare
                      style={{
                        color: "#C40E61",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
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
            <p>{infoPelicula.year_release} </p>
            <p className="info_titulo"> Dirigida por </p>
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
        <div className="mainResena">
          <div className="section-header">
            <div className="contenedor-img">
              <img src={Fuego} alt="Fuego" />
            </div>
            <h2>
              <span>Reseñas</span>
            </h2>
          </div>

          <div className="resenaSection">
            <div className="botonResena">
              <button
              onClick= {() => {
                if (window.innerWidth <= 600) {
                  setshowNuevaResena(false);
                  console.log("show:", showNuevaResena);
                } else {
                  setshowNuevaResena(true);
                }
              }}
              >
                <IoIosAddCircleOutline size={30} style={{ color: "#E8E8E8" }} />
                Añadir Reseña
              </button>
            </div>
            {resenas}
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
