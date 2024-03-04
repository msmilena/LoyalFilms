import React from "react";
import "../Componentes/Login.css";
import { IoIosCloseCircleOutline, IoIosWarning } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import logosimbolo from "../img/LogoSimbolo.png";
const PopUpLista = ({ onCloseList }) => {
    const numeroDeListas = 3; // Puedes ajustar esto según el número deseado de listas

const listas = Array.from({ length: numeroDeListas }, (_, index) => (
  <div key={index} className={`lista ${index === 0 ? 'sinBordeSuperior' : ''}`}>
    <div className="nombreLista">{`Lista ${index + 1}`}</div>
  </div>
));
  return (
    <div className="popUpContainer" style={{alignItems: 'center'}}>
      <IoIosCloseCircleOutline
        className={"closeButton"}
        onClick={onCloseList}
        size={40}
        style={{ color: "#C40E61" }}
      />
      <div className="imgContainer">
        <img src={logosimbolo} alt="Logo" className="Logo" />
      </div>
      <div className={"titleContainer"}>
            <div>Añadir a Lista</div>
        </div>
        <div className="fila">
        <div className="btnNueva">
              <button>
                <IoIosAddCircleOutline size={30} style={{ color: "#C40E61" }} />
                Nueva Lista
              </button>
        </div>
        </div>
      
     
     <div className="listascontainer">
         {listas}
     </div>

    <input
                className={"listbtn"}
                type="button"
                // onClick={onButtonClick}
                value={"Guardar"} />
   
     

    </div>
  );
};
export default PopUpLista;
