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
module.exports.upload = upload;

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
        // Verificar los datos recibidos
        console.log('Datos recibidos en el body:', req.body);
        console.log('Archivo recibido:', req.file);

        // Desestructuramos los datos del cuerpo
        const { titulo, contenido, autor, fecha } = req.body;
        const imagen = req.file ? req.file.filename : null; // Guardar solo el nombre del archivo

        // Validaciones básicas
        if (!titulo || !contenido || !autor || !fecha) {
            console.log('Faltan datos obligatorios');
            return res.status(400).send('Faltan datos obligatorios');
        }

        console.log('Datos a insertar:', { titulo, contenido, autor, fecha, imagen });

        const sql = `
            INSERT INTO noticias (titulo, contenido, autor, fecha, imagen, creado_en, actualizado_en)
            VALUES (?, ?, ?, ?, ?, NOW(), NOW())
        `;

        // Ejecutar la consulta SQL
        conexion.query(sql, [titulo, contenido, autor, fecha, imagen], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                return res.status(500).send('Error al crear la noticia');
            }

            console.log('Noticia creada con éxito, ID:', result.insertId);
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
            console.error('Error al eliminar la noticia:', err);
            return res.status(500).json({ success: false, message: 'Error al eliminar la noticia' });
        }

        if (result.affectedRows === 0) {
            // Si no se eliminó ninguna fila, el ID no existe
            console.warn(`No se encontró la noticia con ID: ${id}`);
            return res.status(404).json({ success: false, message: 'No se encontró la noticia a eliminar' });
        }

        console.log(`Noticia con ID ${id} eliminada correctamente`);
        res.json({ success: true, message: 'Noticia eliminada correctamente' });
    });
};

