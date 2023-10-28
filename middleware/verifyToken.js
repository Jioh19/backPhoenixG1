const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	// Obtenemos el token del header del request, del req.body o del req.query
	const token =
		req.body.token || req.query.token || req.headers['x-access-token'];
	// Validamos si existe token en el req
	if (!token) {
		return res.status(403).send('Un token es requerido para la autorización');
	}
	try {
		// Verificamos el token usando la dependencia de jwt y el método .verify
		const decoded = jwt.verify(token, 'Clave secreta!!!');
		// Si el token es correcto nos devolverá los datos que colocamos en el token
		console.log(decoded);
		req.user = decoded;
		// next() indica que el req pasó la prueba y continue su camino next();
	} catch (err) {
		return res.status(401).json({
			status: 401,
			message: 'Invalid Token denied access',
		});
	}
	return next();
};

module.exports = verifyToken;
