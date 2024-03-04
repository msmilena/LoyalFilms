import React from "react";
import "../Componentes/Login.css";
import { IoIosCloseCircleOutline, IoIosWarning } from "react-icons/io";
import logosimbolo from "../img/LogoSimbolo.png";

const PopUpNuevaLista = ({ onCloseNueva }) => {
  return (
    <div className="popUpContainer" style={{ alignItems: "center" }}>
      <IoIosCloseCircleOutline
        className={"closeButton"}
        onClick={onCloseNueva}
        size={40}
        style={{ color: "#C40E61" }}
      />
      <div className="imgContainer">
        <img src={logosimbolo} alt="Logo" className="Logo" />
      </div>
      <div className="titleContainer">
        <div>Nueva Lista</div>
      </div>
      
      <div className="fila">
      <div className="subtitulo">Nombre</div>
      </div>
        
        <div className={"inputContainerNueva"}>
          <input
            placeholder="Ingresa nombre de la lista"
            className={"inputBox"}
          />
        </div>

        <div className="fila">
      <div className="subtitulo">Descripción</div>
      </div>

        
  
          <textarea
            placeholder="Ingresa descripción de la lista"
            className={"inputBoxDes"}
          />

      <input className={"listbtn"} type="button" value={"Guardar"} />
    </div>
  );
};
export default PopUpNuevaLista;
