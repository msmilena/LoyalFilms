import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MoviesGrid } from "../Componentes/MoviesGrid";
import Navbar from "../Componentes/NavBar.jsx";
import Footer from "../Componentes/Footer.jsx";
import { Navegacion } from "../Componentes/Navegacion.jsx";
import "../Componentes/Resultados.css";
import "../Componentes/Loader.css";
import Login from "../Pages/Login.js";
import Register from "./Register.js";

export function Resultados() {

var [nombreGenero, setNombreGenero] = useState(""); 

const { genero } = useParams(); // Obtiene la palabra clave de la URL

const handleGeneroSearch = (genero) => {
    switch (genero) {
        case 28:
            setNombreGenero("Acción"); 
            break;
        case 12:
            setNombreGenero("Aventura");
            break;
        case 35:
            setNombreGenero("Comedia");
            break;
        case 18:
            setNombreGenero("Drama");
            break;
        case 10749:
            setNombreGenero("Romance");
            break;
        default:
            setNombreGenero("");
            break;
    }
};

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar si se está cargando o no
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [resultsPerPage, setResultsPerPage] = useState(12); // Resultados por página
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  // Función para buscar películas por la palabra clave y página
  const buscarPeliculas = async () => {
    try {
      setIsLoading(true); // Mostrar el loader

      const response = await fetch(
        `http://localhost:5000/movies/genero?genero=${genero}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data:", data);
        setSearchResults(data);
        handleGeneroSearch(parseInt(genero));
      } else {
        console.error("Error fetching movies:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Ocultar el loader después de 10 segundos
      }, 2000);
    }

  };



  useEffect(() => {
    buscarPeliculas();
  }, [genero]); // Vuelve a ejecutar la búsqueda cuando la palabra clave cambia

  // Función para manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Lógica para obtener los resultados de la página actual
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  return (
    <div
      className={`homePage ${
        showLoginPopup || showRegisterPopup ? "popupActive" : ""
      }`}
    >
      {showLoginPopup && (
        <Login
          onClose={() => setShowLoginPopup(false)}
          onRegisterClick={() => {
            setShowRegisterPopup(true);
            setShowLoginPopup(false);
          }}
        />
      )}{" "}
      {/* Modifica el componente de Login para manejar el clic en el enlace de registro */}
      {showRegisterPopup && (
        <Register
          onCloseRegister={() => setShowRegisterPopup(false)}
          onLoginClick={() => {
            setShowLoginPopup(true);
            setShowRegisterPopup(false);
          }}
        />
      )}{" "}
      {/* Muestra el componente de registro si showRegisterPopup es true */}
      <header>
        <Navbar
          showLoginPopup={showLoginPopup}
          setShowLoginPopup={setShowLoginPopup}
        />
      </header>
      <main style={{ marginTop: "100px" }}>
        {isLoading ? (
          <div className="loader-page">
            <div className="loader-container">
              <span className="loader"></span>
            </div>
            <h2>Búsqueda: {nombreGenero}</h2>
          </div>
        ) : (
          <div>
            <h2>Resultados en {nombreGenero}</h2>
            <MoviesGrid movies={currentResults} />
            <Navegacion
              totalPages={Math.ceil(searchResults.length / resultsPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        <Footer
          showLoginPopup={showLoginPopup}
          setShowLoginPopup={setShowLoginPopup}
          onRegisterClick={() => {
            setShowRegisterPopup(true);
            setShowLoginPopup(false);
          }}
        />
      </main>
    </div>
  );
}

export default Resultados;
