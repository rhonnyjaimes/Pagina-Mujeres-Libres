const jwt = require('jsonwebtoken');


exports.verificarToken = (req, res, next) => {
    const token = req.cookies.token; // Leer el token desde las cookies

    if (!token) {
        res.locals.isAuthenticated = false; // No autenticado
        return next(); // Continuar, pero indicar que no está autenticado
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verificado:', decoded); // Depuración: mostrar el token verificado

        req.user = decoded; // Guardar los datos del usuario en req.user
        res.locals.isAuthenticated = true; // Usuario autenticado
        res.locals.user = decoded; // Pasar los datos del usuario a la vista
        next(); // Continuar al siguiente middleware o controlador
    } catch (err) {
        console.error('Token inválido:', err);
        res.locals.isAuthenticated = false; // Token inválido
        return next(); // Continuar pero indicar que no está autenticado
    }
};


exports.requerirAdmin = (req, res, next) => {
    if (!req.user || req.user.rol !== 'admin') {
        console.error('Acceso denegado: Solo administradores pueden acceder a esta ruta.');
        return res.status(403).render('error', {
            mensaje: 'Acceso denegado. Solo los administradores pueden acceder a esta sección.'
        }); // Mostrar vista de error con advertencia
    }
    next(); // Usuario con rol admin, continuar
};