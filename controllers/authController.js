// controllers/authController.js
const path = require('path');
const conexion = require('../db'); // Importamos la conexión a MySQL

// Mostrar formulario de registro
exports.mostrarRegistro = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'registro.html'));
};

// Registrar un usuario nuevo
exports.registrarUsuario = (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';

    conexion.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).send('Error al registrar usuario');
        }
        res.send('Usuario registrado correctamente');
    });
};

// Mostrar formulario de inicio de sesión
exports.mostrarLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
};

// Iniciar sesión
exports.iniciarSesion = (req, res) => {
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
};
