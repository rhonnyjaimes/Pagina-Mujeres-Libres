exports.verificarToken = (req, res, next) => {
    const token = req.cookies.token; // Leer el token desde las cookies

    if (!token) {
        return res.redirect('/registro'); // Redirigir si no hay token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Añadir los datos decodificados a la solicitud
        next(); // Continuar al siguiente middleware o controlador
    } catch (err) {
        return res.redirect('/registro'); // Redirigir si el token es inválido
    }
};

