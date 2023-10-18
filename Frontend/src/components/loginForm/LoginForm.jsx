import React, { useState, useContext } from "react";

import { useNavigate }  from "react-router-dom";
import "./LoginForm.css";
import {CounterUser} from "../../Context/CounterUser";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldEmpty, setFieldEmpty] = useState(false);
  const navigate = useNavigate();
  const {setUser} = useContext(CounterUser)
  function handleSubmit(event) {
    event.preventDefault();
    if(username === "" || password === ""){
      setFieldEmpty(true);
    }else{
      setFieldEmpty(false);
      fetch(`http://localhost:8081/users/:${username}/:${password}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.response === 'LOGIN_SUCCESFULLY'){
          const structureUser = {
            'name': data.name,
            'id': data.id,
            'rol': data.rol
          }
          localStorage.setItem('user', JSON.stringify(structureUser));
          setUser(JSON.stringify(structureUser))
          navigate('/home')
        }else{
          console.log(data.response)
        }
      })
      .catch((err) => console.log(err));
    }
    
  }

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#f2f3f7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{
                  borderRadius: "1rem",
                  boxShadow: "0px 0px 10px rgba(150, 150, 150, 100)",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">GUEPARDEX</h3>

                    <div className="form-outline mb-4">
                      {fieldEmpty ? 
                      (<div className="alert alert-warning" role="alert">
                        Por favor rellene todos los campos
                    </div>)
                      :(
                        ""
                      )}
                      <input
                        type="text"
                        className="form-control form-control-lg "
                        style={{ border: "1px solid #9b9b9b" }}
                        placeholder="Nombre de usuario"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        style={{ border: "1px solid #9b9b9b" }}
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <button
                      style={{
                        backgroundColor: "#130A81",
                        color: "white",
                      }}
                      className="btn btn-lg btn-block "
                      type="submit"
                    >
                      Entrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginForm;
