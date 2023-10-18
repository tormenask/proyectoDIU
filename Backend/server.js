require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
<<<<<<< HEAD
=======
app.use(express.json())
>>>>>>> 378ed47 (Se hace el login, la creacion de rutas privadas y se une con el requisito funcional de crear cursos)
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

<<<<<<< HEAD
app.get("/libros", (req, res) => {
    const sql = "SELECT * FROM libros";
=======
app.get("/users", (req, res) => {
    const sql = "SELECT username, id FROM users WHERE rol != 'Admin' AND rol != 'Teacher'";

>>>>>>> 378ed47 (Se hace el login, la creacion de rutas privadas y se une con el requisito funcional de crear cursos)
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

<<<<<<< HEAD
=======

app.get("/courses/addCourse:name/:courseCode/:participants", (req, res) => {
    var sql = "INSERT INTO courses (name, courseCode) VALUES (?,?)";
    db.query(sql, [(req.params.name).slice(1), (req.params.courseCode).slice(1)], (err, data) => {
        if (err) return res.json(err);
        return res.json("PROCCESS_SUCCESFULLY");
    });
});

app.get("/registration/:id", (req, res) => {
    const sql = `SELECT c.courseCode AS course_code, c.name AS course_name
    FROM Registration r
    JOIN courses c ON r.courseId = c.id
    WHERE r.userId = ?;`;
    db.query(sql, req.params.id, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});



app.get("/users/:username/:pass", (req, res) => {
    const sql = 'SELECT username, id, rol FROM users WHERE username = ? AND pass = ?';
    db.query(sql, [(req.params.username).slice(1), (req.params.pass).slice(1)], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
            const server = {
                "name": data[0].username,
                "id": data[0].id,
                "rol": data[0].rol,
                "response": "LOGIN_SUCCESFULLY"
            }
            return res.json(server);
        } else {
            return res.json(server.response = "USER_OR_PASS_INVALID")
        }
    });
});




>>>>>>> 378ed47 (Se hace el login, la creacion de rutas privadas y se une con el requisito funcional de crear cursos)
app.get("/", (re, res) => {
    return res.json("hello from backend side");
});

<<<<<<< HEAD
=======

>>>>>>> 378ed47 (Se hace el login, la creacion de rutas privadas y se une con el requisito funcional de crear cursos)
app.listen(8081, () => {
    console.log("listening");
});
