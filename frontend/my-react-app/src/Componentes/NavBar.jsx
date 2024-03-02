import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../img/Logo.png";
import { LuUser2 as User } from "react-icons/lu";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import "./NavBar.css";

const Navbar = ({ showLoginPopup, setShowLoginPopup }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [genero, setGenero] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("searchTerm:", searchTerm);
    // Redirigir a la página de resultados de búsqueda con la palabra clave ingresada
    navigate(`/resultados/${searchTerm}`);
  };

  const handleGeneroSearch = (genero) => {
    navigate(`/resultadosgenero/${genero}`);
  };

  const [username, setUsername] = useState(""); // Variable de estado para almacenar el nombre del usuario
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [localStorage.getItem("token")]);

  return (
    <nav>
      <img src={logo} alt="Logo" />
      <button className="hamburger" onClick={handleClick}>
        {click ? (
          <FaTimes size={30} style={{ color: "#444444" }} />
        ) : (
          <FaBars size={30} style={{ color: "#444444" }} />
        )}
      </button>
      <ul className={click ? "navbar-menu active" : "navbar-menu"}>
        <li>
          <RouterLink to="/" onClick={closeMenu}>
            Inicio
          </RouterLink>
        </li>
        <li>
          <ScrollLink
            to="Tendencias"
            onClick={closeMenu}
            smooth={true}
            duration={500}
            spy={true}
            hashSpy={true}
            exact="true"
            offset={50}
          >
            Tendencias
          </ScrollLink>
        </li>

        <li>
          <ScrollLink
            to="Nuevos"
            onClick={closeMenu}
            smooth={true}
            duration={500}
            spy={true}
            hashSpy={true}
            exact="true"
            offset={50}
          >
            Nuevos
          </ScrollLink>
        </li>

        <li>
          <div className="dropdown">
            <div className="contenedorbtn">
              <button className="dropbtn">Géneros</button>
              <IoIosArrowDown
                className="arrow-icon"
                style={{ marginLeft: "10px" }}
              />
            </div>
            <div className="dropdown-content">
              <a href="#" onClick={() => { handleGeneroSearch(28); }}>Acción</a>
              <a href="#" onClick={() => { handleGeneroSearch(12); }}>Aventura</a>
              <a href="#" onClick={() => { handleGeneroSearch(35); }}>Comedia</a>
              <a href="#" onClick={() => { handleGeneroSearch(18); }}>Drama</a>
              <a href="#" onClick={() => { handleGeneroSearch(10749); }}>Romance</a>
            </div>
          </div>
        </li>

        <li>
          <div className="search-container">
            <IoIosSearch className="search-icon" onClick={handleSearch} />
            <input
              type="text"
              placeholder="Buscar una película"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </li>

        {!isLoggedIn && (
          <li style={{ display: "flex", alignItems: "stretch" }}>
            <User size={20} style={{ color: "#C40E61", marginRight: "5px" }} />
            <button
              className="abrirLogin"
              onClick={() => {
                if (window.innerWidth <= 600) {
                  setShowLoginPopup(false);
                  console.log("showLoginPopup:", showLoginPopup);
                } else {
                  setShowLoginPopup(true);
                }
              }}
              style={{ color: "#C40E61" }}
            >
              Iniciar Sesión
            </button>
          </li>
        )}

        {isLoggedIn && (
          <ul className="dropdown">
            <li>
              <User
                size={20}
                style={{ color: "#C40E61", marginRight: "5px" }}
              />
              {username}
            </li>

            <li>
              <RouterLink onClick={handleLogout}>Cerrar Sesión</RouterLink>
            </li>

            <li>
              <RouterLink to="/perfil" onClick={closeMenu}>
                Perfil
              </RouterLink>
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
