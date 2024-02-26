import React, { useState, useEffect } from 'react';
import Navbar from '../Componentes/NavBar.jsx';
import Section from '../Componentes/Section.jsx';
//import MainSection from '../Componentes/MainSection.jsx';
import Footer from '../Componentes/Footer.jsx';
//import Login from '../Pages/Login.js';
import '../Componentes/Homepage.css';
import imgPerfil from '../img/imgPerfil.jpg';
import "../css/Perfil.css";
function Perfil() {

    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        //setSelectedFile(e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setSelectedFile(e.target.result);
            }
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            //const formData = new FormData();
            //formData.append('file', selectedFile);

             ////Aquí deberías enviar formData a tu servidor para guardar la foto en la base de datos
             ////Puedes usar fetch, axios u otra librería para hacer la solicitud al servidor

            console.log('Foto seleccionada:', selectedFile);
        } else {
            console.log('Selecciona una foto primero.');
        }
    };

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
    }, []); 


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
                    <div class="active">
                        Perfil
                    </div>
                        <div>Contrase&ntilde;a</div>
                    <div>Avatar</div>
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
                                                onChange={ev => setUsername(ev.target.value)}
                                                className={"inputBox"} />
                                            {/*<label className="errorLabel">{usernameError}</label>*/}
                                            {/*{showWarning && usernameError && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}*/}
                                            </div>
                                    </div>
                                    <div class="w50 dflex" style={{ gap: '10px' }}>
                                        <div class="w50">
                                            <div className="subtitulo">
                                                Nombre
                                            </div>

                                            <div className={"inputContainer"}>
                                                <input
                                                    value={username}
                                                    placeholder="Ingresa su Nombre"
                                                    onChange={ev => setUsername(ev.target.value)}
                                                    className={"inputBox"} />
                                                {/*<label className="errorLabel">{usernameError}</label>*/}
                                                {/*{showWarning && usernameError && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}*/}
                                            </div>
                                        </div>
                                        <div class="w50">
                                            <div className="subtitulo">
                                                Apellido
                                            </div>

                                            <div className={"inputContainer"}>
                                                <input
                                                    value={username}
                                                    placeholder="Ingresa su Apellido"
                                                    onChange={ev => setUsername(ev.target.value)}
                                                    className={"inputBox"} />
                                                {/*<label className="errorLabel">{usernameError}</label>*/}
                                                {/*{showWarning && usernameError && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}*/}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w50">
                                        <div className="subtitulo">
                                            Correo Electr&oacute;nico
                                        </div>

                                        <div className={"inputContainer"}>
                                            <input
                                                type={'email'}
                                                value={username}
                                                placeholder="Ingresa nombre de usuario"
                                                onChange={ev => setUsername(ev.target.value)}
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
                                                value={username}
                                                placeholder="Ingresa tu historia"
                                                onChange={ev => setUsername(ev.target.value)}
                                            className={"inputContainer inputBox"}
                                            />
                                            {/*<label className="errorLabel">{usernameError}</label>*/}
                                            {/*{showWarning && usernameError && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}*/}
                                        

                                    </div>
                                    <button class="btnguardarCambios">Guardar Cambios</button>
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
                                            {/*<label className="errorLabel">{passwordError}</label>*/}
                                            {/*{showWarning && passwordError && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}*/}
                                        </div>
                                    </div>
                                    <div class="w50">
                                        <div className="subtitulo">
                                            Nueva Contrase&ntilde;a
                                        </div>
                                        <div className={"inputContainer"}>
                                            <input
                                                type="password"
                                                value={password}
                                                placeholder="Ingresa tu Nueva Contrase&ntilde;a"
                                                onChange={ev => setPassword(ev.target.value)}
                                                className={"inputBox"}
                                            />
                                            {/*<label className="errorLabel">{passwordError}</label>*/}
                                            {/*{showWarning && passwordError && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}*/}
                                        </div>
                                    </div>
                                    <div class="w50">
                                        <div className="subtitulo">
                                            Confirma tu Nueva Contrase&ntilde;a
                                        </div>
                                        <div className={"inputContainer"}>
                                            <input
                                                type="password"
                                                value={password}
                                                placeholder="Ingresa Contrase&ntilde;a Actual"
                                                onChange={ev => setPassword(ev.target.value)}
                                                className={"inputBox"}
                                            />
                                            {/*<label className="errorLabel">{passwordError}</label>*/}
                                            {/*{showWarning && passwordError && <IoIosWarning style={{ color: '#F92323' }}>  </IoIosWarning>}*/}
                                        </div>
                                    </div>
                                    <button class="btnguardarCambios_Contraseña">Guardar Cambios</button>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                                        {/*<div class="imagenCircular" id="contenedor-imagen">*/}
                                        {/*    <img id="imagen-seleccionada" src="" alt="Imagen Circular">*/}
                                        {/*</div>*/}

                                        
                                        <div style={{
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            width: '200px', // ajusta el tamaño de la imagen
                                            height: '200px', // ajusta el tamaño de la imagen
                                            border: '0.5px solid rgb(240, 31, 126)',
                                            backgroundImage: `url(${require('../img/imgPerfil.jpg')})`, // Reemplaza "nombre_de_la_imagen.jpg" con el nombre real de tu imagen
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}>
                                            <img src={selectedFile} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                        </div>

                                        

                                        <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                                        <label htmlFor="file-upload" className="custom-file-upload">
                                            Subir Foto
                                        </label>
                                        <button class="btnguardarCambios_Avatar" onClick={handleUpload}>Guardar Cambios</button>
                                    </div>

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