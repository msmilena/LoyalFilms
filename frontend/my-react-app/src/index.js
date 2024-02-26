import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import Resena from './Pages/Resena.js';
import Login from './Pages/Login.js';
import Registro from './Pages/Register.js';
import Resultados from './Pages/Resultados.js';
import InfoUsuario from './Pages/InfoUsuario.js';
import Perfil from './Pages/Perfil.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "resena",
    element: <Resena/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "registro",
    element: <Registro/>,
  },
  {
    path: "resultados/:palabra",
    element: <Resultados/>,
   },
   {
        path: "informacionUsuario",
       element: <InfoUsuario/>,
    },
    {
        path: "perfil",
        element: <Perfil />,
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);
reportWebVitals();
