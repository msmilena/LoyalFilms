import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Componentes/Login.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";
import logosimbolo from "../img/LogoSimbolo.png";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showWarning, setShowWarning] = useState(false); // New state variable for showing warning

  const navigate = useNavigate();

  const onButtonClick = async () => {
    // Validación básica (puedes personalizarla según tus necesidades)
    if (!email || !password) {
      setEmailError("Ingrese Usuario");
      setPasswordError("Ingrese Contraseña");
      setShowWarning(true); // Show warning if email or password is empty
      return;
    }

    // Realiza la solicitud POST al servidor usando fetch
    try {
      const response = await fetch("http://localhost:5000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      // Maneja la respuesta del servidor
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);

        // Redirige a otra página (puedes personalizarla según tus necesidades)
        navigate("/");
        onClose(); // Close the login popup
      } else {
        // Maneja errores de la solicitud al servidor
        const errorData = await response.json();
        console.error("Error:", errorData);
        setShowWarning(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={"popUpContainer"}>
      <IoIosCloseCircleOutline
        className={"closeButton"}
        onClick={onClose}
        size={40}
        style={{ color: "#C40E61" }}
      />
      <IoIosCloseCircleOutline className={"closeButton"} onClick={onClose} size={40} style={{ color: '#C40E61'}} />        

       <div className="imgContainer">
        <img src={logosimbolo} alt="Logo" className="Logo"/>
       </div>
      

      <div className={"titleContainer"}>
            <div>Iniciar Sesión</div>
        </div>
        {showWarning && <div className="warningLabel">El usuario o la contraseña son incorrectas. Inténtelo de nuevo</div>}
      <div className="subtitulo">
        Nombre de Usuario
      </div>

        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Ingresa nombre de usuario"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
            {showWarning && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}
        </div>

        <div className="subtitulo">
        Contraseña
      </div>
      
        <div className={"inputContainer"}>
            <input
                type="password"
                value={password}
                placeholder="Ingresa contraseña"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"}
                />
            <label className="errorLabel">{passwordError}</label>
            {showWarning && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}
        </div>

        

        <div className="opciones">
        <div>
            <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className={"checkbox"} />
            <label htmlFor="rememberMe" className="texto">Recuérdame</label>
        </div>
            
            <div
              className="texto">¿No tienes una cuenta?
              <a href="#" className="texto">Regístrate</a>
            </div>
            
        </div>
        
            <input
                className={"ingresarButton"}
                type="button"
                onClick={onButtonClick}
                value={"Ingresar"} />
       
    </div>);
}

export default Login