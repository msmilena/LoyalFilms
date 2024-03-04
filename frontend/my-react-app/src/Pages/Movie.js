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
import { FaStar } from "react-icons/fa";
import { LuUser2 as User } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import PopUpLista from "./PopUpLista";
import PopUpNuevaLista from "./PopUpNuevaLista";
import PopUpNuevaResena from "./PopUpNuevaResena";
import PopUpEditarResena from "./PopUpEditarResena.js";

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
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Estado para verificar si la sesión está activa
    const location = useLocation();
    const [showListPopUp, setshowListPopUp] = useState(false);
    const [showNuevaLista, setshowNuevaLista] = useState(false);
    const [showNuevaResena, setshowNuevaResena] = useState(false);
    const [showEditarResena, setshowEditarResena] = useState(false);
    const [idResenaSeleccionada, setIdResenaSeleccionar] = useState(null);
    const [idPelicula, setIdPelicula] = useState(null);
    const [resenas, setResenas] = useState([]);
    const url = "https://loyalfilms.onrender.com"
    useEffect(() => {
        console.log(vista);
        console.log(favorita);

        const id = new URLSearchParams(location.search).get("id");
        setIdPelicula(id)
        if (id) {
            obtenerPelicula(id);
            obtenerResena(id);
        } else {
            alert("No se encontró el ID en la URL");
        }

    setIsLoggedIn(!!localStorage.getItem("token")); // Actualizar el estado de isLoggedIn al montar el componente
    if (isLoggedIn) {
       console.log(localStorage.getItem("idusuario"))
      estado_botones(localStorage.getItem("idusuario"), id)
    }

  }, [location.search]);

  function obtenerListas(idusuario) {
    
  
    fetch(url+`/listas/obtenerListas?idusuario=${idusuario}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener las listas del usuario');
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
        // Aquí maneja el error si ocurriera
      });
  }
  


    function estado_botones(idusuario, idpelicula) {
        fetch(url+'/listas/verificarPeliculaEnListas', {
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
        fetch(url + `/movies/informacion?id=${id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setinfoPelicula(data);
            })
            .catch((error) => console.error("Error fetching movies:", error));
    }

    function obtenerResena(id) {
        fetch(url+`/resenas/${id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                if (data.success === false) {
                    // Si no se encontraron reseñas, establece un array vacío
                    setResenas([]);
                } else {
                    // Si se encontraron reseñas, actualiza el estado con las reseñas obtenidas
                    setResenas(data);
                }
            })
            .catch((error) => console.error("Error fetching reviews:", error));
    }
    function desmarcarVista() {
        const id = new URLSearchParams(location.search).get("id");
        console.log(vista);
        console.log('desmarcar vista');
        fetch(url +'/listas/eliminarPelicula', {
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
        console.log(vista);
        console.log('marcar vista');
        const id = new URLSearchParams(location.search).get("id");
        fetch(url+'/listas/anadirPelicula', {
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

        fetch(url+'/listas/eliminarPelicula', {
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
        fetch(url+'/listas/anadirPelicula', {
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

    function editarResena(idresena) {
        const idpelicula = new URLSearchParams(location.search).get("id");
        setshowEditarResena(true);
        setIdResenaSeleccionar(idresena)
        //console.log(idResenaSeleccionada)
    }

    function eliminarResena(idresena) {
        fetch(url+`/resenas/${idresena}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    throw new Error('Error al guardar la reseña');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Aquí puedes manejar el error si ocurriera
            });
    }

    function compartirResena() {

    }

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const numeroDeResenas = 2; // Puedes ajustar esto según el número deseado de repeticiones
    // console.log("a",showListPopUp )
    // const resenasRenderizadas = Array.from({ length: numeroDeResenas }, (_, index) => (
    const resenasRenderizadas = resenas.map((resena, index) => (
        <div className="resenaContenedor" key={index}>
            <div className="fila">
                <div className="usuarioResena">
                    <User size={30} style={{ color: "#C40E61", marginRight: "5px" }} />
                    {resena.idusuario ? resena.idusuario : "Reseña Anónima"}
                </div>
                <div className="fecha">{resena.fecha}</div>
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
                {resena.contenido}
            </div>
            <div className="fila">
                {resena.idusuario === localStorage.getItem('usuario') && (
                    <>
                        <div className="botonResena">
                            <button>
                                <FaRegShareFromSquare style={{ color: "#E8E8E8", size: "30px" }} />
                                Compartir
                            </button>
                        </div>
                        <div className="botonResena" >
                            <button onClick={() => editarResena(resena.id)}>
                                <FaRegEdit style={{ color: "#E8E8E8", size: "30px" }} />
                                Editar Reseña
                            </button>
                        </div>
                        <div className="botonResena" onClick={() => eliminarResena(resena.id)}>
                            <button>
                                <FaRegTrashAlt style={{ color: "#E8E8E8", size: "30px" }} />
                                Eliminar Reseña
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    ));
    // console.log(infoPelicula);

    return (
        <div className={`page ${showLoginPopup || showListPopUp || showNuevaLista || showNuevaResena || showEditarResena ? 'popupActive' : ''}`}>
            {showListPopUp && <PopUpLista onCloseList={() => setshowListPopUp(false)} onNuevoClick={() => { setshowNuevaLista(true); setshowListPopUp(false); setShowLoginPopup(false) }} />}
            {showNuevaLista && <PopUpNuevaLista onCloseNueva={() => setshowNuevaLista(false)} />}
            {showNuevaResena && <PopUpNuevaResena onCloseResena={() => setshowNuevaResena(false)} idpelicula={idPelicula} />}
            {showEditarResena && <PopUpEditarResena onCloseEdit={() => setshowEditarResena(false)} idResena={idResenaSeleccionada} />}
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
                  <button id="botonMarcado" className="boton" onClick={vista ? desmarcarVista : marcarVista} disabled={!isLoggedIn}>
                    {vista ? (
                      <MdOutlineRemoveRedEye size={50} style={{ color: "#C40E61" }} />
                    ) : (
                      <RxEyeClosed size={50} style={{ color: "#C40E61" }} />
                    )}
                    Ver
                  </button>
                </div>
                <div className="boton">
                  <button id="botonMarcado" className="boton" onClick={favorita ? desmarcarFavorita : marcarFavorita} disabled={!isLoggedIn}>
                    {favorita ? (
                      <FaHeart size={50} style={{ color: "#C40E61" }} />
                    ) : (
                      <FaRegHeart size={50} style={{ color: "#C40E61" }} />
                    )}
                    Me gusta
                  </button>
                </div>
                <div className="boton">
                  <div className="contenedorIcono abrirLogin"
                    onClick={() => {
                      if (window.innerWidth <= 600) {
                        setshowListPopUp(false);
                        console.log("show:", showListPopUp);
                      } else {
                        setshowListPopUp(true);
                        obtenerListas(localStorage.getItem("idusuario"));
                        console.log("hola paso por listas")
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
                            <div className="fila" style={{ justifyContent: "center", borderBottom: '0px solid #00000047', paddingBottom: '0px' }}>
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
                        <h1 className="titulo_pelicula">{infoPelicula.title}({infoPelicula.year_release})</h1>
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
                        {/*<p>{infoPelicula.year_release} </p>*/}
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
                                onClick={() => {
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
                        {resenasRenderizadas}
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
