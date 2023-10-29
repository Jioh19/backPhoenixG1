const fs = require('fs');

const verifySignUp = async (req, res, next) => {
	const username = req.body.username;
	// Validamos si existe username en el req
	if (!username) {
		return res.status(403).send({
			code: '403',
			message: 'Invalid username',
		});
	}
	const usuarios = await JSON.parse(fs.readFileSync('./DB/users.json'));
	const usuario = await usuarios.find((user) => user.username == username);
	if (usuario !== undefined) {
		console.log('usuario existe');
		return res.status(409).send({
			code: '409',
			message: 'Username already exists',
		});
	} else {
		req.usuario = usuario;
		return next();
	}
};

module.exports = verifySignUp;
