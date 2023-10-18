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


export default App;
