import React, { useState, useEffect } from 'react';
import Navbar from '../Componentes/NavBar.jsx';
import Section from '../Componentes/Section.jsx';
//import MainSection from '../Componentes/MainSection.jsx';
import Footer from '../Componentes/Footer.jsx';
//import Login from '../Pages/Login.js';
import '../Componentes/Homepage.css';
import imgPerfil from '../img/imgPerfil.png';
import "../css/Perfil.css";
function Perfil() {

    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [biografia, setBiografia] = useState("");
    const [lastname, setLastname] = useState("");
    const [idUser, setIdUsername] = useState(localStorage.getItem("idusuario") || "");
    const [datosUsuario, setDatosUsuario2] = useState([]);
    const [pestanaActiva, setPestanaActiva] = useState('part1');
    const [statusSave1, setstatusSave1] = useState("");
    const [showStatus1, setShowStatus1] = useState(false);
    const [statusSave2, setstatusSave2] = useState("");
    const [showStatus2, setShowStatus2] = useState(false);
    const [changeUsername, setchangeUsername] = useState(false);
    const [changeEmail, setchangeEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmNewPassword, setconfirmNewPassword] = useState("");


    const seleccionarPestana = (pestana) => {
        setPestanaActiva(pestana);
    };

    const url = "http://127.0.0.1:5000"

    useEffect(() => {
        let tabs = document.querySelector(".tabs");
        let tabHeader = tabs.querySelector(".tab-header");
        let tabHeaderNodes = tabs.querySelectorAll(".tab-header > div");
        let tabContent = tabs.querySelector(".tab-content");
        let tabContentNodes = tabs.querySelectorAll(".tab-content > div");

        for (let i = 0; i < tabHeaderNodes.length; i++) {
            tabHeaderNodes[i].addEventListener("click", function () {
                tabHeader.querySelector(".active").classList.remove("active");
                tabHeaderNodes[i].classList.add("active");
                tabContent.querySelector(".active").classList.remove("active");
                tabContentNodes[i].classList.add("active");
            });
        }
        obtenerDatosUsuario();
        
    }, []); 



    function obtenerDatosUsuario() {
        try {
            //const url = `http://localhost:5000/user/info?idUser=${idUser}`;
            console.log(idUser);
            //url.searchParams.append("idUser", idUser);

            fetch(url+`/user/info?idUser=${idUser}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        setDatosUsuario2(data.userData);
                        if (data.userData !=null) {
                            setUsername(data.userData.username);
                            setEmail(data.userData.email);
                            setName(data.userData.name);
                            setLastname(data.userData.lastname);
                            setBiografia(data.userData.biografia);
                            setPassword(data.userData.password);
                        }
                    });
                } else {
                    response.json().then(errorData => {
                        console.error("Error:", errorData);

                        //setShowWarning(true);
                    });
                }
            }).catch(error => {
                console.error("Error:", error);
                //setShowWarning(true);
            });
        } catch (error) {
            console.error("Error:", error);
            //setShowWarning(true);
        }
    }


    const guardarCambios = async () => {
        setstatusSave1("");
        setShowStatus1(false);
        setstatusSave2("");
        setShowStatus2(false);
        console.log(idUser, username, name, lastname, email, biografia, changeUsername, changeEmail);
        if (pestanaActiva === 'part1') {
            try {
                const response = await fetch(url+"/user/guardarDatos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idUser: idUser,
                        username: username,
                        name: name,
                        lastname: lastname,
                        email: email,
                        biografia: biografia,
                        changeUsername: changeUsername,
                        changeEmail: changeEmail
                    }),
                });

                // Maneja la respuesta del servidor
                if (response.ok) {
                    setstatusSave1(
                        <div className="warningLabel2">
                            Guardado exitoso!
                        </div>
                    );
                    setShowStatus1(true);
                } else {
                    // Maneja errores de la solicitud al servidor
                    const errorData = await response.json();
                    setstatusSave1(errorData.message);
                    setShowStatus1(true);
                }
            } catch (error) {
                console.log(error);
            }
            console.log('Guardando cambios del primer tab');
        } else if (pestanaActiva === 'part2') {
            if (password == newpassword) {
                setstatusSave2(
                    <div className="warningLabel2">
                        La nueva contrasena es igual a la antigua!
                    </div>
                );
                setShowStatus2(true);

            } else if (newpassword !== confirmNewPassword) {
                setstatusSave2(
                    <div className="warningLabel2">
                        Las contrasenas nuevas no coinciden!
                    </div>
                );
                setShowStatus2(true);
            } else{
                        try {
                            const response = await fetch(url+"/user/editarContrasena", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    idUser: idUser,
                                    newpassword: newpassword
                                }),
                            });

                            // Maneja la respuesta del servidor
                            if(response.ok) {
                        setstatusSave2(
                            <div className="warningLabel2">
                                Guardado exitoso!
                            </div>
                        );
                        setShowStatus1(true);
                    } else {
                        // Maneja errores de la solicitud al servidor
                        const errorData = await response.json();
                        setstatusSave2(errorData.message);
                        setShowStatus2(true);
                    }
                } catch (error) {
                    console.log(error);
                }

            }
            // Guardar cambios del segundo tab
            console.log('Guardando cambios del segundo tab');
        }
    };


    return (
        //<div className={`homePage ${showLoginPopup ? 'popupActive' : ''}`}>
        //    {showLoginPopup && <Login onClose={() => setShowLoginPopup(false)} />}
        <div class="divPerfilCambios">
            <header>
                <Navbar showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup} />
            </header>
            <body>
            <main class="mainPerfilDatos">
                <div class="firstpart">
                <h1 class="h1DatosPerfil">Datos Perfil</h1>
                <div class="tabs">
                    <div class="tab-header">
                                <div
                                    id="part1"
                                    class={pestanaActiva === 'part1' ? 'active' : ''}
                                    onClick={() => seleccionarPestana('part1')}
                                >
                        Perfil
                    </div>
                                <div
                                    id="part2"
                                    class={pestanaActiva === 'part2' ? 'active' : ''}
                                    onClick={() => seleccionarPestana('part2')}
                                >Contrase&ntilde;a</div>
                    {/*<div>Avatar</div>*/}
                    </div>
                <div class="tab-content">
                                <div class="active">
                                    <div class="w50">
                                        <div className="subtitulo">
                                            Nombre de Usuario
                                        </div>

                                        <div className={"inputContainer"}>
                                            <input
                                                value={username}
                                                placeholder="Ingresa nombre de usuario"
                                                onChange={(ev) => {
                                                    setUsername(ev.target.value);
                                                    setchangeUsername(true);
                                                }}
                                                className={"inputBox"} />
                                            </div>
                                    </div>
                                    <div class="w50 dflex" style={{ gap: '10px' }}>
                                        <div class="w50">
                                            <div className="subtitulo">
                                                Nombre
                                            </div>

                                            <div className={"inputContainer"}>
                                                <input
                                                    value={name}
                                                    placeholder="Ingresa su Nombre"
                                                    onChange={ev => setName(ev.target.value)}
                                                    className={"inputBox"} />
                                            </div>
                                        </div>
                                        <div class="w50">
                                            <div className="subtitulo">
                                                Apellido
                                            </div>

                                            <div className={"inputContainer"}>
                                                <input
                                                    value={lastname}
                                                    placeholder="Ingresa su Apellido"
                                                    onChange={ev => setLastname(ev.target.value)}
                                                    className={"inputBox"} />

                                            </div>
                                        </div>
                                    </div>
                                    <div class="w50">
                                        <div className="subtitulo">
                                            Correo Electr&oacute;nico
                                        </div>

                                        <div className={"inputContainer"}>
                                            <input
                                                value={email}
                                                type={'email'}
                                                placeholder="Ingresa nombre de usuario"
                                                onChange={(ev) => {
                                                    setEmail(ev.target.value);
                                                    setchangeEmail(true);
                                                }}
                                                className={"inputBox"} />
                                            {/*<label className="errorLabel">{usernameError}</label>*/}
                                            {/*{showWarning && usernameError && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}*/}
                                        </div>
                                    </div>
                                    <div class="w50">
                                        <div className="subtitulo">
                                            Biografia
                                        </div>                   
                                            <textarea
                                            value={biografia}
                                                placeholder="Ingresa tu historia"
                                                onChange={ev => setBiografia(ev.target.value)}
                                            className={"inputContainer inputBox"}
                                            />

                                        

                                    </div>
                                    <button class="btnguardarCambios" onClick={guardarCambios}>Guardar Cambios</button>
                                    {showStatus1 && statusSave1 && (
                                        <div className="warningLabel1">{statusSave1}</div>
                                    )}
                                </div>
                                <div>
                                    <div class="w50">
                                        <div className="subtitulo">
                                            Contrase&ntilde;a Actual
                                        </div>
                                        <div className={"inputContainer"}>
                                            <input
                                                type="password"
                                                value={password}
                                                placeholder="Ingresa Contrase&ntilde;a Actual"
                                                onChange={ev => setPassword(ev.target.value)}
                                                className={"inputBox"}
                                            />

                                        </div>
                                    </div>
                                    <div class="w50">
                                        <div className="subtitulo">
                                            Nueva Contrase&ntilde;a
                                        </div>
                                        <div className={"inputContainer"}>
                                            <input
                                                type="password"
                                                value={newpassword}
                                                placeholder="Ingresa tu Nueva Contrase&ntilde;a"
                                                onChange={ev => setNewPassword(ev.target.value)}
                                                className={"inputBox"}
                                            />

                                        </div>
                                    </div>
                                    <div class="w50">
                                        <div className="subtitulo">
                                            Confirma tu Nueva Contrase&ntilde;a
                                        </div>
                                        <div className={"inputContainer"}>
                                            <input
                                                type="password"
                                                value={confirmNewPassword}
                                                placeholder="Ingresa Contrase&ntilde;a Actual"
                                                onChange={ev => setconfirmNewPassword(ev.target.value)}
                                                className={"inputBox"}
                                            />

                                        </div>
                                    </div>
                                    <button class="btnguardarCambios" onClick={guardarCambios}>Guardar Cambios</button>
                                    {showStatus2 && statusSave2 && (
                                        <div className="warningLabel1">{statusSave2}</div>
                                    )}
                                </div>
                    </div>
                    </div>
                </div>
                </main>
            </body>
            <Footer showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup} />
        </div>
    );
}

export default Perfil;