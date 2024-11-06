// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = 3000;

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
// Rutas HTML
app.get('/mujeres_libres_1', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'mujeres_libres_1.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'mujeres_libres_1.html'));
});

app.get('/mujeres_libres_2', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'mujeres_libres_2.html'));
});

app.get('/mujeres_libres_3', (req, res) => {
    res.sendFile(path.join(__dirname, 'mujeres_libres_3.html'));
});

app.get('/mujeres_libres_4', (req, res) => {
    res.sendFile(path.join(__dirname, 'mujeres_libres_4.html'));
});

// Rutas de autenticación
app.use('/', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});