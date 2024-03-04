import React, {useState}from "react";
import "../Componentes/Login.css";
import { IoIosCloseCircleOutline, IoIosWarning } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import logosimbolo from "../img/LogoSimbolo.png";
const PopUpEditarResena = ({ onCloseEdit, idResena }) => {
    const [rating, setRating] = useState(null);
    const [description, setDescription] = useState("")
    const [hover, setHover] = useState(null);
    const url = "http://127.0.0.1:5000"
    const handleSave = () =>{
        // Aquí puedes enviar la solicitud PUT al servidor con los datos actualizados
        fetch(url+`/resenas/${idResena}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify({
              contenido: description,
              calificacion: rating,
          }),
      })
      .then(response => {
          if (response.ok) {
              // Si la solicitud se completó correctamente, cierra el popup
              onCloseEdit();
              window.location.reload();
          } else {
              throw new Error('Error al guardar la reseña');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          // Aquí puedes manejar el error si ocurriera
      });
  };
    return (
        <div className="popUpContainer" style={{ alignItems: "center" }}>
            <IoIosCloseCircleOutline
        className={"closeButton"}
        onClick={onCloseEdit}
        size={40}
        style={{ color: "#C40E61" }}
      />
            <div className="imgContainer">
                <img src={logosimbolo} alt="Logo" className="Logo" />
            </div>
            <div className="titleContainer">
                <div>Editar Reseña</div>
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
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />
            <input className={"listbtn"} type="button" value={"Guardar"} onClick={handleSave} />
        </div>
    );
}

export default PopUpEditarResena;