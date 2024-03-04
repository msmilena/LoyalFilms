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
import Fuego from '../img/Fuego.png';
import Login from '../Pages/Login.js';
import Register from './Register.js';
import { RxEyeClosed } from "react-icons/rx";
import { FaHeart } from "react-icons/fa6";


function Movie() {
  const [infoPelicula, setinfoPelicula] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [vista, setVista] = useState(false);
  const [favorita, setFavorita] = useState(false);
  const imageUrl = "https://image.tmdb.org/t/p/w342" + infoPelicula.poster_path;
  const location = useLocation();

  useEffect(() => {
    const id = new URLSearchParams(location.search).get("id");
    if (id) {
      obtenerPelicula(id);
    } else {
      alert("No se encontró el ID en la URL");
    }

    const isLoggedIn = !!localStorage.getItem("token");
    if (isLoggedIn) {
      // console.log(id)
      estado_botones(localStorage.getItem("idusuario"), id)
    }

  }, [location.search]);



  function estado_botones(idusuario, idpelicula) {
    fetch('/listas/verificarPeliculaEnListas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        idusuario: idusuario,
        idpelicula: idpelicula
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al verificar la película en las listas del usuario');
        }
      })
      .then(data => {
        setVista(data.Vista);
        setFavorita(data.Favorita);
      })
      .catch(error => {
        console.error('Error:', error);
        // Aquí maneja el error si ocurriera
      });
  }
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

  function desmarcarVista() {
      const id = new URLSearchParams(location.search).get("id");
    
      fetch('http://127.0.0.1:5000/listas/eliminarPelicula', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          idusuario: localStorage.getItem('idusuario'), // Obtén el ID de usuario de localStorage
          nombreLista: 'Peliculas Vistas', // Nombre de lista "Peliculas Vistas"
          idPelicula: id // Utiliza el ID de la película de la URL
        })
      })
      .then(response => {
        if (response.ok) {
          // Recarga la página si la solicitud fue exitosa
          // window.location.reload();
          setVista(false)
        } else {
          // Captura el mensaje de error
          return response.json().then(data => {
            throw new Error(data.message);
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Aquí puedes manejar el error si ocurriera
      });
  }

  function marcarVista() {
    const id = new URLSearchParams(location.search).get("id");
    fetch('http://127.0.0.1:5000/listas/añadirPelicula', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        nombreLista: 'Peliculas Vistas', // Reemplaza con el nombre de tu lista
        idusuario: localStorage.getItem('idusuario'), // Obtén el ID de usuario de localStorage
        idpelicula: id, // Suponiendo que infoPelicula contiene la información de la película actual
        nombrePelicula: infoPelicula.title // Suponiendo que infoPelicula contiene la información de la película actual
      })
    })
    .then(response => {
      if (response.ok) {
        // Recarga la página si la solicitud fue exitosa
        //window.location.reload();
        setVista(true)
      } else {
        // Captura el mensaje de error
        return response.json().then(data => {
          throw new Error(data.message);
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Aquí puedes manejar el error si ocurriera
    });
  }

  function desmarcarFavorita() {
    const id = new URLSearchParams(location.search).get("id");
    
      fetch('http://127.0.0.1:5000/listas/eliminarPelicula', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          idusuario: localStorage.getItem('idusuario'), // Obtén el ID de usuario de localStorage
          nombreLista: 'Peliculas Favoritas', // Nombre de lista "Peliculas Vistas"
          idPelicula: id // Utiliza el ID de la película de la URL
        })
      })
      .then(response => {
        if (response.ok) {
          // Recarga la página si la solicitud fue exitosa
          // window.location.reload();
          setFavorita(false)
        } else {
          // Captura el mensaje de error
          return response.json().then(data => {
            throw new Error(data.message);
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Aquí puedes manejar el error si ocurriera
      });
  }

  function marcarFavorita() {
    const id = new URLSearchParams(location.search).get("id");
    fetch('http://127.0.0.1:5000/listas/añadirPelicula', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        nombreLista: 'Peliculas Favoritas', // Reemplaza con el nombre de tu lista
        idusuario: localStorage.getItem('idusuario'), // Obtén el ID de usuario de localStorage
        idpelicula: id, // Suponiendo que infoPelicula contiene la información de la película actual
        nombrePelicula: infoPelicula.title // Suponiendo que infoPelicula contiene la información de la película actual
      })
    })
    .then(response => {
      if (response.ok) {
        // Recarga la página si la solicitud fue exitosa
        setFavorita(true)
        //window.location.reload();
      } else {
        // Captura el mensaje de error
        return response.json().then(data => {
          throw new Error(data.message);
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Aquí puedes manejar el error si ocurriera
    });
  }

  // console.log(infoPelicula);

  return (
    <div className={`homePage ${showLoginPopup || showRegisterPopup ? 'popupActive' : ''}`}>


      {showLoginPopup && <Login onClose={() => setShowLoginPopup(false)} onRegisterClick={() => { setShowRegisterPopup(true); setShowLoginPopup(false); }} />} {/* Modifica el componente de Login para manejar el clic en el enlace de registro */}
      {showRegisterPopup && <Register onCloseRegister={() => setShowRegisterPopup(false)} onLoginClick={() => { setShowLoginPopup(true); setShowRegisterPopup(false); }} />} {/* Muestra el componente de registro si showRegisterPopup es true */}

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
                  <button id="botonMarcado" className="boton" onClick={vista ? desmarcarVista : marcarVista}>
                    {vista ? (
                      <MdOutlineRemoveRedEye size={50} style={{ color: "#C40E61" }} />
                    ) : (
                      <RxEyeClosed size={50} style={{ color: "#C40E61" }} />
                    )}
                    Ver
                  </button>
                </div>
                <div className="boton">
                  <button id="botonMarcado" className="boton" onClick={favorita ? desmarcarFavorita : marcarFavorita}>
                    {favorita ? (
                      <FaHeart size={50} style={{ color: "#C40E61" }} />
                    ) : (
                      <FaRegHeart size={50} style={{ color: "#C40E61" }} />
                    )}
                    Me gusta
                  </button>
                </div>
                <div className="boton">
                  <button id="botonMarcado" className="boton" ><IoIosAddCircleOutline
                    size={50}
                    style={{ color: "#C40E61" }}
                  />
                    Añadir a lista
                  </button>

                </div>
              </div>
              <div className="fila">
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
                    stroke: `rgba(34, 3, 255, ${infoPelicula.porcentaje / 100
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
