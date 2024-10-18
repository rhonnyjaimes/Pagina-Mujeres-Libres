const express = require('express');
const bodyParser = require('body-parser');
const conexion = require('./db');  // Importamos la conexión a MySQL
const app = express();

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para mostrar el formulario de registro
app.get('/registro', (req, res) => {
  res.sendFile(__dirname + '/registro.html');  // Servimos el formulario de registro
});

// Ruta para procesar el registro de usuarios
app.post('/registrar', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';

  conexion.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).send('Error al registrar usuario');
    }
    res.send('Usuario registrado correctamente');
  });
});

// Ruta para mostrar el formulario de inicio de sesión
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');  // Servimos el formulario de inicio de sesión
});

// Ruta para procesar el inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';

  conexion.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).send('Error al iniciar sesión');
    }
    if (result.length > 0) {
      res.send('Inicio de sesión exitoso');
    } else {
      res.send('Usuario o contraseña incorrectos');
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
