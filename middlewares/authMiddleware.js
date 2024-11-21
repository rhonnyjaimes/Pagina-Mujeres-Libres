const jwt = require('jsonwebtoken');


exports.verificarToken = (req, res, next) => {
    const token = req.cookies.token; // Leer el token desde las cookies

    if (!token) {
        console.warn('No se encontró token en las cookies'); // Depuración si no hay token
        return res.redirect('/login'); // Redirigir si no hay token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verificado:', decoded); // Depuración: mostrar el token verificado
        req.user = decoded; // Añadir los datos decodificados a la solicitud
        next(); // Continuar al siguiente middleware o controlador
    } catch (err) {
        console.error('Token inválido:', err); // Error en la verificación del token
        return res.redirect('/login'); // Redirigir si el token es inválido
    }
};

