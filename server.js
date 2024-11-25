// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const { verificarToken } = require('./middlewares/authMiddleware');

const app = express();
const PORT = 3000;
app.use(express.json()); // Para manejar datos JSON en el body
app.use(express.urlencoded({ extended: true }));

// Middleware para procesar cookies
app.use(cookieParser());
console.log(require('./middlewares/authMiddleware'));

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json()); // Para manejar datos JSON en el body
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(verificarToken);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas de autenticación (primero para manejar sesiones y autenticaciones)
app.use('/', authRoutes);

// Rutas de contenido (incluyen las noticias)
app.use('/', newsRoutes);


// Rutas HTML específicas
app.get('/mujeres_libres_1', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'mujeres_libres_1.html'));
});

app.get('/index', (req, res) => {
    res.render('mujeres_libres_1'); // Renderiza la vista EJS
});
app.get('/historia', (req, res) => {
    res.render('mujeres_libres_2'); // Renderiza la vista EJS
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
