import React from "react";
import { NavLink, Routes, Route, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { CounterUser } from '../../Context/CounterUser';
import MyCourses from '../MyCourses';

import "./stylesNav.css";


function NavBar() {
  const redirect = useNavigate();
  const {user,setUser} = useContext(CounterUser);
  
  
  function closeSession(){
    localStorage.clear();
    setUser(null);
    redirect("/login");
  }
  return (
    <>
      <nav
        className="navbar navbar-expand-md bg-body-tertiary fixed-top p-0 "
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink
            to={"/mycourses"}
            className="navbar-brand d-none d-sm-block d-md-block d-lg-block d-xxl-block"
          >
            Universidad Guepardex
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to={"/"}
                  className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                  aria-current="page"
                >
                  Página principal
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/mycourses"}
                  className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                  aria-current="page"
                >
                  Mis cursos
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="dropdown" data-bs-theme="light">
            <button
              className="btn dropdown space-between"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div id="circleProfile"> {user.name.charAt(0)} </div>
              <div id="arrowProfile" />
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Action two
                </a>
              </li>
              <li>
                <a onClick={closeSession} className="dropdown-item" href="/">Cerrar sesion</a>
            
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasNavbar"
        style={{
          maxWidth: "250px",
        }}
      ></div>
      <Routes>
        <Route path="/" element={"hola"} />
        <Route path="/mycourses" element={<MyCourses/>} />
      </Routes>
    </>
  );
}

export default NavBar;
