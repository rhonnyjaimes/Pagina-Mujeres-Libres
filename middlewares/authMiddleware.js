const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('Se requiere un token para acceder a este recurso');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Añadir el usuario decodificado a la solicitud
        next();
    } catch (err) {
        return res.status(401).send('Token inválido o expirado');
    }
};
