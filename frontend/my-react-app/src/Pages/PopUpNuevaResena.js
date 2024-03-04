import React, {useState}from "react";
import "../Componentes/Login.css";
import { IoIosCloseCircleOutline, IoIosWarning } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import logosimbolo from "../img/LogoSimbolo.png";
const PopUpNuevaResena = ({ onCloseResena }) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    return (
        <div className="popUpContainer" style={{ alignItems: "center" }}>
            <IoIosCloseCircleOutline
        className={"closeButton"}
        onClick={onCloseResena}
        size={40}
        style={{ color: "#C40E61" }}
      />
            <div className="imgContainer">
                <img src={logosimbolo} alt="Logo" className="Logo" />
            </div>
            <div className="titleContainer">
                <div>Nueva Reseña</div>
            </div>
            <div className="fila">
                <div className="subtitulo">Calificación</div>
            </div>

            <div className="fila">
            <div className="ratingEstrellas" style={{width:"70%"}}>
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
            </div>

            

            <div className="fila">
                <div className="subtitulo">Descripción</div>
            </div>
            <textarea
            placeholder="Ingresa descripción de la reseña"
            className={"inputBoxDes"}
          />
            <input className={"listbtn"} type="button" value={"Guardar"} />
        </div>
    );
}

export default PopUpNuevaResena;