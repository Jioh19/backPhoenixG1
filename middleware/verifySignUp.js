const fs = require('fs');

const verifySignUp = async (req, res, next) => {
	const email = req.body.email;
	// Validamos si existe email en el req
	if (!email) {
		return res.status(403).send('Campo email es requerido');
	}
	const usuarios = await JSON.parse(fs.readFileSync('./DB/users.json'));
	const usuario = await usuarios.find((user) => user.email == email);
	if (usuario !== undefined) {
		console.log('usuario existe');
		return res.status(409).send('Email ingresado existe, inicie login');
	} else {
		req.usuario = usuario;
		return next();
	}
};

module.exports = verifySignUp;
