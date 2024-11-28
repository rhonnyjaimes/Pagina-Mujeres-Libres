// routes/newsRoutes.js
const express = require('express');
const conexion = require('../db');
const path = require('path');

const router = express.Router();
const newsController = require('../controllers/newsController');
const { verificarToken, requerirAdmin } = require('../middlewares/authMiddleware');
// Ruta para ver el detalle de una noticia (requiere autenticación)
router.get('/detalle-noticia',requerirAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/detalle-noticia.html'));
});

// Ruta para obtener todas las noticias (requiere autenticación)
router.get('/noticias', requerirAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'noticias.html'));
});



// Ruta para agregar una noticia (requiere autenticación)
router.get('/agregar-noticia', verificarToken, requerirAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'agregar-noticia.html'));
});

// Ruta POST para crear una nueva noticia (requiere autenticación)
router.post('/api/noticias',   newsController.crearNoticia);
// routes/newsRoutes.js

// Ruta para ver el detalle de una noticia (requiere autenticación)
router.get('/detalle-noticia', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/detalle-noticia.html'));
});

// Ruta para obtener una noticia por ID (sin token requerido, para ser accesible sin autenticación)
router.get('/api/noticias/:id',   newsController.obtenerNoticiaPorId);

// Ruta para obtener todas las noticias en formato JSON (sin token requerido)
router.get('/api/noticias',  newsController.obtenerNoticias);

// Ruta para obtener una noticia específica por ID (requiere autenticación)
router.get('/noticias/:id',  newsController.obtenerNoticiaPorId);

// Ruta PUT para actualizar una noticia (requiere autenticación)
router.put('/api/noticias/:id',  requerirAdmin, newsController.actualizarNoticia);

// Ruta DELETE para eliminar una noticia (requiere autenticación)
router.delete('/api/noticias/:id', verificarToken, requerirAdmin, newsController.eliminarNoticia);

module.exports = router;
