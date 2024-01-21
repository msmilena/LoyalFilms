import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import Resena from './Pages/Resena.js';
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
]);
=======
import App from './App';
import reportWebVitals from './reportWebVitals';
>>>>>>> 7b2e4eb0ce6b96ce534091d11c8ee889952939e5

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <RouterProvider router = {router} />
  </React.StrictMode>
);
=======
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
>>>>>>> 7b2e4eb0ce6b96ce534091d11c8ee889952939e5
reportWebVitals();
