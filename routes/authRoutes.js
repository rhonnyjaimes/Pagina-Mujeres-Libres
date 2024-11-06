// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para mostrar el formulario de registro
router.get('/registro', authController.mostrarRegistro);

// Ruta para procesar el registro de usuarios
router.post('/registrar', authController.registrarUsuario);

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', authController.mostrarLogin);

// Ruta para procesar el inicio de sesión
router.post('/login', authController.iniciarSesion);

module.exports = router;
