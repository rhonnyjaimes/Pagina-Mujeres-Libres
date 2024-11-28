const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conexion = require('../db'); // Importamos la conexión a MySQL
require('dotenv').config(); // Cargar variables de entorno

// Mostrar formulario de registro
exports.mostrarRegistro = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'registro.html'));
};

// Registrar un usuario nuevo
exports.registrarUsuario = async (req, res) => {
    const { username, password, rol } = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO usuarios (username, password, rol) VALUES (?, ?, ?)';

        conexion.query(sql, [username, hashedPassword, rol], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).render('error', { mensaje: 'Error al registrar el usuario. Inténtalo de nuevo.' });
            }

            // Redirigir con un mensaje de éxito
            res.render('registroexitoso', {
                mensaje: 'Usuario registrado correctamente. Redirigiendo al inicio de sesión...',
                url: '/login'
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { mensaje: 'Error al procesar la solicitud' });
    }
};

// Mostrar formulario de inicio de sesión
exports.mostrarLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
};

// Iniciar sesión
exports.iniciarSesion = (req, res) => {
    const { username, password } = req.body;
    console.log(`Intentando iniciar sesión para el usuario: ${username}`);

    const sql = 'SELECT * FROM usuarios WHERE username = ?';

    conexion.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).render('errorlogin', { mensaje: 'Error al iniciar sesión' });
        }

        if (results.length === 0) {
            console.warn('Usuario no encontrado');
            return res.status(401).render('errorlogin', { mensaje: 'Usuario no registrado' });
        }

        const user = results[0];
        console.log(`Usuario encontrado: ${JSON.stringify(user)}`);

        try {
            // Verificar la contraseña encriptada
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.warn('Contraseña incorrecta');
                return res.status(401).render('errorlogin', { mensaje: 'Usuario o contraseña incorrectos' });
            }

            // Crear un token JWT
            const token = jwt.sign(
                { id: user.id, username: user.username, rol: user.rol },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // Expira en 1 hora
            );

            console.log('Token generado:', token);

            // Almacenar el token en una cookie
            res.cookie('token', token, { httpOnly: true });

            // Mostrar mensaje de bienvenida con el nombre de usuario y rol
            return res.render('bienvenida', {
                mensaje: `Bienvenido ${user.username}`,
                rol: `Rol: ${user.rol}`,
                url: '/index' // Redirigir a la página principal
            });
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            return res.status(500).render('errorlogin', { mensaje: 'Error al iniciar sesión' });
        }
    });
};



exports.cerrarSesion = (req, res) => {
    const user = req.user; // Obtener el usuario de la sesión
    res.clearCookie('token'); // Eliminar la cookie del token
    console.log('Sesión cerrada correctamente'); // Mensaje en consola

    // Renderizar la vista de cierre de sesión
    res.render('cerrarSesion', { user: user });
};
