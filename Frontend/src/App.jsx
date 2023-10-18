<<<<<<< HEAD
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/libros")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Tittle</th>
            <th>Autor</th>
            <th>code</th>
            <th>price</th>
            <th>cuantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            return (
              <tr key={i}>
                <td>{d.codigo}</td>
                <td>{d.titulo}</td>
                <td>{d.autor}</td>
                <td>{d.codigoeditorial}</td>
                <td>{d.precio}</td>
                <td>{d.cantidad}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

=======
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import LoginForm from "./components/loginForm/LoginForm";
import React from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import PageIndex from "./components/PageIndex";
import StateUser from "./Context/StateUser";
import MyCourses from "./components/MyCourses";
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
      <StateUser>
        <Routes>
          <Route path="/" element={<PageIndex />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Teacher", "Student"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mycourses"
            element={
              <ProtectedRoute allowedRoles={["Admin","Teacher"]} navigateTo={"/home"}>
                <Navbar/>
                <MyCourses />
              </ProtectedRoute>
            }
          />
        </Routes>
      </StateUser>
    </BrowserRouter>
  );
}


>>>>>>> 378ed47 (Se hace el login, la creacion de rutas privadas y se une con el requisito funcional de crear cursos)
export default App;
