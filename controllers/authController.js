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
                return res.status(500).send('Error al registrar usuario');
            }
            res.send('Usuario registrado correctamente');
        });
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
};

// Mostrar formulario de inicio de sesión
exports.mostrarLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
};

// Iniciar sesión
exports.iniciarSesion = (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE username = ?';

    conexion.query(sql, [username], async (err, results) => {
        if (err) {
            return res.status(500).send('Error al iniciar sesión');
        }

        if (results.length > 0) {
            const user = results[0];

            // Verificar la contraseña encriptada
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send('Usuario o contraseña incorrectos');
            }

            // Crear un token JWT
            const token = jwt.sign(
                { id: user.id, username: user.username, rol: user.rol },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // Expira en 1 hora
            );

            res.json({ message: 'Inicio de sesión exitoso', token });
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    });
};
