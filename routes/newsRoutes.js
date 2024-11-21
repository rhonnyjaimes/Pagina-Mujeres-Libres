// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const path = require('path');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas CRUD para noticias
router.get('/noticias', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'noticias.html'));
});
router.get('/agregar-noticia', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'agregar-noticia.html'));
});

router.post('/api/noticias', newsController.crearNoticia);

router.get('/detalle-noticia', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/detalle-noticia.html'));
});

router.get('/api/noticias/:id', newsController.obtenerNoticiaPorId);

// Ruta para obtener las noticias en formato JSON (API)
router.get('/api/noticias', newsController.obtenerNoticias);
router.get('/noticias/:id', newsController.obtenerNoticiaPorId);
router.put('/noticias/:id', newsController.actualizarNoticia);
router.delete('/api/noticias/:id', newsController.eliminarNoticia);

module.exports = router;
