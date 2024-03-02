import React, { useState, useEffect } from 'react';
import Navbar from '../Componentes/NavBar.jsx';
import { useLocation } from 'react-router-dom';
import Footer from '../Componentes/Footer.jsx';
import '../Componentes/Homepage.css';
function Movie() {

    const [infoPelicula, setinfoPelicula] = useState([]);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const id = new URLSearchParams(location.search).get("id");
        if (id) {
            obtenerPelicula(id);
        } else {
            alert("No se encontró el ID en la URL")
        }
    }, [location.search]);

    function obtenerPelicula(id) {
        fetch(`http://localhost:5000/movies/informacion?id=${id}`, {
            method: 'GET',
        })

            .then(response => response.json())
            .then(data => { setinfoPelicula(data); console.log(data) })
            .catch(error => console.error('Error fetching movies:', error));
    }

    return (
        <div>
            <header>
                <Navbar showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup} />
            </header>
            <main className="mainDiv">
                <div className="mainMovie">
                    <div className="infoMovie1">

                    </div>
                    <div className="infoMovie2">

                    </div>
                </div>
                <div className="mainResena">
                </div>
                <Footer showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup} />
            </main>

        </div>
    );
}

export default Movie;
