import React, { useState, useEffect, useContext } from "react";
import "./MyCourses.css";
import Course from "./Course/Course";
import Select from "react-select";
import { CounterUser } from "../../Context/CounterUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faBook,
  faScaleBalanced,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [rechargeCourses, setRechargeCoruses] = useState(false);
  const [modalType, setModalType] = useState("");
  const {user} = useContext(CounterUser);


  useEffect(() => {
    
    fetch(`http://localhost:8081/registration/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        if (data && data.length > 0) {
          setCourses(data);
        }
      })
      .catch((err) => {
        if (typeof err.json === "function") {
          err
            .json()
            .then((jsonError) => {
              console.log("Error JSON desde la API");
              //console.log(jsonError);
            })
            .catch((genericError) => {
              console.log("Error genérico desde la API");
              //console.log(err.statusText);
            });
        } else {
          console.log("Error de Fetch");
        }
      });
  }, [rechargeCourses]);

  useEffect(() => {
    fetch("http://localhost:8081/users")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const newUsers = data.map((user) => ({
            value: user.id,
            label: user.username,
          }));
          setUsers(newUsers);
        }
      })
      .catch((err) => {});
  }, []);

  function validateForm() {
    "use strict";
    var fieldCorrect = [];

    const forms = document.querySelectorAll(".needs-validation");

    forms[0].addEventListener(
      "submit",
      (event) => {
        if (!forms[0].checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          event.stopPropagation();
          fieldCorrect.push("validated");
        }

        forms[0].classList.add("was-validated");

        if (Array.from(forms).length === fieldCorrect.length) {
          const FormCreateCourse = new FormData(forms[0]);
          const name = FormCreateCourse.get("nameCourse");
          const courseCode = FormCreateCourse.get("codeCourse");
          const integrantsCourse = [];
          document
            .getElementsByName("integrantsCourse")
            .forEach((integrante) => {
              if (integrante.value != "") {
                integrantsCourse[integrantsCourse.length] = integrante.value;
              }
            });
          fetch(
            `http://localhost:8081/courses/addCourse:${name}/:${courseCode}/:${integrantsCourse}}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data == "PROCCESS_SUCCESFULLY") {
                const closeModal = document
                  .getElementById("btnCloseModalCreateCourse")
                  .click();
                setRechargeCoruses(true);
                setTimeout(() => {
                  setModalType("SUCCESS");
                  const openModalSucces = document
                    .getElementById("btnModalSucces")
                    .click();
                }, 1000);
              } else if (data.code === "ER_DUP_ENTRY") {
                const closeModal = document
                  .getElementById("btnCloseModalCreateCourse")
                  .click();
                setRechargeCoruses(true);
                setTimeout(() => {
                  setModalType("DUPLICATE");
                  const openModalSucces = document
                    .getElementById("btnModalSucces")
                    .click();
                }, 1000);
              }
            })
            .catch((error) => {
              console.log(error.json());
            });
        }
      },
      false
    );
  }

  useEffect(() => {
    validateForm();
  }, []);

  return (
    <>
      {/* Modal añadir curso*/}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Crear nuevo curso
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="row needs-validation"
                id="formCreateCourse"
                noValidate
              >
                <div className="col-6 mb-3">
                  <label htmlFor="inputNameCourse" className="form-label">
                    Nombre del curso:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="inputNameCourse"
                    name="nameCourse"
                    required
                  />
                  <div className="invalid-feedback">
                    Porfavor digite un nombre valido
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="inputCodeCourse" className="form-label">
                    Codigo del curso:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="inputCodeCourse"
                    name="codeCourse"
                    required
                  />
                  <div className="invalid-feedback">
                    Porfavor digite un Codigo valido
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="inputIntegrantCourse" className="form-label">
                    Codigo del curso:
                  </label>
                  <Select
                    isMulti
                    closeMenuOnSelect={false}
                    name="integrantsCourse"
                    options={users}
                    maxMenuHeight={150}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    id="inputIntegrantCourse"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="btnCloseModalCreateCourse"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                form="formCreateCourse"
                id="buttonCreateCourse"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal curso añadido exitosamente */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalSucces"
        id="btnModalSucces"
        style={{ display: "none" }}
      ></button>
      <div
        className="modal fade"
        id="modalSucces"
        tabIndex="-1"
        aria-labelledby="modalSuccesLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className={
                  modalType === "SUCCESS"
                    ? "modal-title fs-5 text-success"
                    : "modal-title fs-5 text-danger"
                }
                id="modalSuccesLabel"
              >
                {modalType === "SUCCESS"
                  ? "El curso se ha creado con exito"
                  : "El curso ya existe, por favor ingrese otro valor"}
              </h1>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalSucces"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* mis cursos */}

      <div className="container">
        <h2 id="tittleSectionTools">Herramientas</h2>
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 col-xl-4 col-xxl-4 mb-4 colTools">
            <div className="card services">
              <FontAwesomeIcon className="card-img services" icon={faBook} />
              <div className="card-body services">
                <h6 className="card-title services">Biblioteca</h6>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-8 col-md-6 col-xl-4 col-xxl-4 mb-4 colTools">
            <div className="card services">
              <FontAwesomeIcon
                className="card-img services"
                icon={faEnvelope}
              />
              <div className="card-body services">
                <h6 className="card-title services">Correo institucional</h6>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-8 col-md-6 col-xl-4 col-xxl-4 mb-4 colTools">
            <div className="card services">
              <FontAwesomeIcon
                className="card-img services"
                icon={faScaleBalanced}
              />
              <div className="card-body services">
                <h6 className="card-title services">Reglamento</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row myCourses">
          <div className="col-12 containerTittleMyCourses">
            <h2 className="tittleSectionMyCourses">Mis cursos</h2>
          </div>

          {courses && courses.length > 0 ? (
            <>
              {courses.map((course, i) => {
                return (
                  <Course
                    name={course.course_name}
                    code={course.course_code}
                    key={i}
                  />
                );
              })}
              <div
                className="col-12 col-sm-12 col-md-6 col-xl-6 col-xxl-4 addCourseCol"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <div className="card addCourse">
                  <div id="cardbackgroundAddCourse" />
                  <FontAwesomeIcon icon={faPlus} id="iconAddCourse" />
                  <h4 id="textAddCourse">Crear nuevo curso</h4>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              <div className="d-flex justify-content-center">cargando...</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyCourses;
