const express = require('express');
const usuarioRouter = express.Router();
const {
	obtenerUsuarios,
	obtenerUsuario,
	modificarUsuario,
	eliminarUsuario,
} = require('../funciones');

usuarioRouter.get('/', async (req, res) => {
	console.log('USUARIO');
	// Implementa la lógica para obtener todos los usuarios
	const usuarios = await obtenerUsuarios();

	if (usuarios === undefined) {
		return res.status(418).send('Soy una tetera');
	}
	return res.status(200).json(usuarios);
});

usuarioRouter.get('/:id', async (req, res) => {
	// Implementa la lógica para obtener un usuario por ID
	const id = req.params.id;
	const usuario = await obtenerUsuario(id);

	if (usuario === undefined) {
		return res.status(418).send('Soy una tetera');
	}
	return res.status(200).json(usuario);
});

usuarioRouter.put('/:id', async (req, res) => {
	// Implementa la lógica para modificar un usuario
	const id = req.params.id;
	const body = req.body;
	const usuario = await modificarUsuario(id, body);

	if (usuario === undefined) {
		return res.status(418).send('Soy una tetera');
	}
	return res.status(200).json(usuario);
});

usuarioRouter.delete('/:id', async (req, res) => {
	// Implementa la lógica para eliminar un usuario
	const id = req.params.id;
	const usuario = await eliminarUsuario(id);

	if (usuario === undefined) {
		return res.status(418).send('Soy una tetera');
	}
	return res.status(200).json(usuario);
});

module.exports = { usuarioRouter };
