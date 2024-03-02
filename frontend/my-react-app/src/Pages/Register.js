import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../Componentes/Register.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";
import logosimbolo from "../img/LogoSimbolo.png";

const Register = ({ onCloseRegister, onLoginClick }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setconfirmPasswordError] = useState("");
  const [statusRegister, setstatusRegister] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // New state variable for showing warning

  // const navigate = useNavigate();

  const onButtonClick = async () => {
    // Restablece los errores
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setconfirmPassword("");
    setstatusRegister("");
    setShowStatus(false);
    setShowWarning(false);


    // Validación básica
    if (!username) {
      setUsernameError("Ingrese Nombre de Usuario");
      setShowWarning(true);
      return;
    }

    if (!email) {
      setEmailError("Ingrese Correo Electrónico");
      setShowWarning(true);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Ingrese un Correo Electrónico válido");
      setShowWarning(true);
      return;
    }

    if (!password) {
      setPasswordError("Ingrese Contraseña");
      setShowWarning(true);
      return;
    }

    // Validación de la contraseña
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError("La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra y un número");
      setShowWarning(true);
      return;
    }

    // Validación de contraseña repetida
    if (!confirmPassword) {
      setconfirmPasswordError("Ingrese la contraseña nuevamente");
      setShowWarning(true);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      setShowWarning(true);
      return;
    }


    // Realiza la solicitud POST al servidor usando fetch
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      // Maneja la respuesta del servidor
      if (response.ok) {
        setstatusRegister(
          <div>
            Registro exitoso!{" "}
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={onLoginClick}
            >
              Inicia sesión
            </span>{" "}
            ahora para comenzar a explorar
          </div>
        );
        setShowStatus(true);
      } else {
        // Maneja errores de la solicitud al servidor
        const errorData = await response.json();
        setstatusRegister(errorData.message);
        setShowStatus(true);
      }
    } catch (error) {
      setstatusRegister("Error en el registro, recargue la página");
      setShowStatus(true);
    }
  };

  return (
    <div className={"popUpContainer"}>
      <IoIosCloseCircleOutline
        className={"closeButton"}
        onClick={onCloseRegister}
        size={40}
        style={{ color: "#C40E61" }}
      />
      <IoIosCloseCircleOutline className={"closeButton"} onClick={onCloseRegister} size={40} style={{ color: '#C40E61' }} />

      <div className="imgContainer">
        <img src={logosimbolo} alt="Logo" className="Logo" />
      </div>


      <div className={"titleContainer"}>
        <div>Regístrate en LoyalFilms</div>
      </div>
      {showStatus && statusRegister && (
        <div className="warningLabel">{statusRegister}</div>
      )}
      <div className="subtitulo">
        Nombre de Usuario
      </div>
      <label className="errorLabel">{showWarning && usernameError && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}{usernameError}</label>
      
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Ingresa nombre de usuario"
          onChange={ev => setUsername(ev.target.value)}
          className={"inputBox"} />
      </div>
      <div className="subtitulo">
        Email
      </div>
      <label className="errorLabel">{showWarning && emailError && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}{emailError}</label>
        
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Ingresa nombre de usuario"
          onChange={ev => setEmail(ev.target.value)}
          className={"inputBox"} />
        
      </div>
      <div className="subtitulo">
        Contraseña
      </div>
      <label className="errorLabel">{showWarning && passwordError && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}{passwordError}</label>
        
      <div className={"inputContainer"}>
        <input
          type="password"
          value={password}
          placeholder="Ingresa contraseña"
          onChange={ev => setPassword(ev.target.value)}
          className={"inputBox"}
        />
      </div>

      <div className="subtitulo">
        Repetir Contraseña
      </div>
      <label className="errorLabel">{showWarning && confirmpasswordError && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}{confirmpasswordError}</label>
        
      <div className={"inputContainer"}>
        <input
          type="password"
          value={confirmPassword}
          placeholder="Ingresa contraseña"
          onChange={ev => setconfirmPassword(ev.target.value)}
          className={"inputBox"}
        />
        
      </div>

      <div className="opciones">
        <div>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            className={"checkbox"} />
          <label htmlFor="rememberMe" className="texto">Aceptar términos y condiciones</label>
        </div>
      </div>
      <input
        className={"ingresarButton"}
        type="button"
        onClick={onButtonClick}
        value={"Registrarme"} />

    </div>);
}

export default Register