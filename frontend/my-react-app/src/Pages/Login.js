import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../Componentes/NavBar.jsx';

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    const navigate = useNavigate();
        
    const onButtonClick = async () => {
    // Validación básica (puedes personalizarla según tus necesidades)
    if (!email || !password) {
        setEmailError("Email is required");
        setPasswordError("Password is required");
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
        } else {
          // Maneja errores de la solicitud al servidor
          const errorData = await response.json();
          console.error("Error:", errorData);
          // Puedes mostrar un mensaje de error al usuario si lo deseas
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    return (
      
    <div className={"mainContainer"}>
      <header>
      <Navbar />
    </header>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
    </div>);
}

export default Login