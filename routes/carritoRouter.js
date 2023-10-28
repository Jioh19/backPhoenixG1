const express = require('express');
const carritoRouter = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
	obtenerCarrito,
	agregarProductoAlCarrito,
	eliminarProductoAlCarrito,
	modificarProductoAlCarrito,
} = require('../funciones');

carritoRouter.get('/', verifyToken, async (req, res) => {
	console.log('CARRITO');
	// Implementa la lógica para obtener el carrito de un usuario
	//const id = req.params.idUsuario;
	const token =
		req.body.token || req.query.token || req.headers['x-access-token'];

	const carrito = await obtenerCarrito(token);

	if (carrito === undefined) {
		return res.status(418).send('Soy una tetera');
	}
	return res.status(200).json(carrito);
});

carritoRouter.post('/agregar', async (req, res) => {
	// Implementa la lógica para agregar un producto al carrito de un usuario
	const token =
		req.body.token || req.query.token || req.headers['x-access-token'];
	const producto = req.body;
	const carrito = await agregarProductoAlCarrito(token, producto);

	if (carrito === undefined) {
		return res.status(418).send('Soy una tetera');
	}
	return res.status(200).json(carrito);
});

carritoRouter.delete('/eliminar/:idProducto', async (req, res) => {
	// Implementa la lógica para eliminar un producto del carrito de un usuario
	const token =
		req.body.token || req.query.token || req.headers['x-access-token'];
	const producto = req.params.idProducto;
	console.log('funcion delete: ', producto);
	const carrito = await eliminarProductoAlCarrito(token, producto);

	if (carrito === undefined) {
		return res.status(418).send('Soy una tetera');
	}
	return res.status(200).json(carrito);
});

carritoRouter.put('/:idUsuario/modificar/:idProducto', async (req, res) => {
	// Implementa la lógica para modificar un producto en el carrito de un usuario
});

module.exports = { carritoRouter };
