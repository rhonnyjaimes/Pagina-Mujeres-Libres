// controllers/newsController.js
const conexion = require('../db');
const multer = require('multer');
const path = require('path');

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Ruta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada imagen
    }
});

const upload = multer({ storage });

// Obtener todas las noticias
exports.obtenerNoticias = (req, res) => {
    const sql = 'SELECT * FROM noticias';
    conexion.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener las noticias' });
        }
        res.json(results);  // Enviar noticias en formato JSON
    });
};
// Obtener una noticia por ID
exports.obtenerNoticiaPorId = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM noticias WHERE id = ?';
    
    conexion.query(sql, [id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(500).send('Error al obtener los detalles de la noticia');
        }
        const noticia = results[0];
        res.json(noticia);
    });
};

// Crear una nueva noticia
exports.crearNoticia = [
    upload.single('imagen'), // Usa multer para manejar la imagen
    (req, res) => {
        const { titulo, contenido, autor, fecha } = req.body;
        const imagen = req.file ? req.file.filename : null; // Guardar solo el nombre del archivo

        const sql = `
            INSERT INTO noticias (titulo, contenido, autor, fecha, imagen, creado_en, actualizado_en)
            VALUES (?, ?, ?, ?, ?, NOW(), NOW())
        `;

        conexion.query(sql, [titulo, contenido, autor, fecha, imagen], (err, result) => {
            if (err) {
                return res.status(500).send('Error al crear la noticia');
            }
            // Redirige a la página de noticias después de la inserción exitosa
            res.redirect('/noticias');
     
        });
    }
];

// Actualizar una noticia
exports.actualizarNoticia = [
    upload.single('imagen'), // Usa multer para manejar la imagen
    (req, res) => {
        const { id } = req.params;
        const { titulo, contenido, autor, fecha } = req.body;
        const imagen = req.file ? req.file.filename : null;
        let sql, params;

        if (imagen) {
            sql = 'UPDATE noticias SET titulo = ?, contenido = ?, autor = ?, fecha = ?, imagen = ?, actualizado_en = NOW() WHERE id = ?';
            params = [titulo, contenido, autor, fecha, imagen, id];
        } else {
            sql = 'UPDATE noticias SET titulo = ?, contenido = ?, autor = ?, fecha = ?, actualizado_en = NOW() WHERE id = ?';
            params = [titulo, contenido, autor, fecha, id];
        }

        conexion.query(sql, params, (err, result) => {
            if (err) {
                return res.status(500).send('Error al actualizar la noticia');
            }
            res.json({ message: 'Noticia actualizada correctamente' });
        });
    }
];

// Eliminar una noticia
exports.eliminarNoticia = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM noticias WHERE id = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send('Error al eliminar la noticia');
        }
        res.json({ message: 'Noticia eliminada correctamente' });
    });
};
