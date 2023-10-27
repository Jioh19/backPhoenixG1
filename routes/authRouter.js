const express = require('express');
const authRouter = express.Router();
const { register, login } = require('../funciones');
const verifySignUp = require('../middleware/verifySignUp');

authRouter.post('/register', verifySignUp, async (req, res) => {
	// Implementa la lógica para el registro
	try {
		const {
			email,
			username,
			firstName,
			lastName,
			city,
			street,
			number,
			zipcode,
			password,
		} = req.body;
		if (
			!(
				email &&
				username &&
				firstName &&
				lastName &&
				city &&
				street &&
				number &&
				zipcode &&
				password
			)
		) {
			res.status(400).send('Todos los datos son requeridos');
		}
		const usuario = await register(req.body);
		if (usuario == '') {
			return res.status(404).json();
		}

		return res.status(201).json(usuario);
	} catch (error) {
		console.log(error);
	}
});

authRouter.post('/login', async (req, res) => {
	console.log('LOGIN');
	// Implementa la lógica para el inicio de sesión
	try {
		// obteniendo los datos de entrada
		const { username, password } = req.body;

		// Validar los datos de entrada
		if (!(username && password)) {
			res
				.status(400)
				.send('Todos los datos son requeridos, username y password');
		}

		const respuesta = await login(username, password);
		console.log(respuesta);
		if (respuesta.code === 200) {
			return res.status(respuesta.code).send(respuesta.token);
		}
		return res.status(respuesta.code).send(respuesta.message);

		// Impresión por el terminal del Token generado para el usuario
		console.log('Usuario: ' + username);
		return res.status(200);
	} catch (error) {
		console.log(error);
	}
});

module.exports = { authRouter };
