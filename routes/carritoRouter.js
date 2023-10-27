const express = require('express');
const carritoRouter = express.Router();
const {
	obtenerCarrito,
	agregarProductoAlCarrito,
	eliminarProductoAlCarrito,
	modificarProductoAlCarrito,
} = require('../funciones');

carritoRouter.get('/:idUsuario', async (req, res) => {
	console.log('CARRITO');
	// Implementa la lógica para obtener el carrito de un usuario
	const id = req.params.idUsuario;
	const carrito = await obtenerCarrito(id);

	if (carrito === undefined) {
		return res.status(418).send('Soy una tetera');
	}
	return res.status(200).json(carrito);
});

carritoRouter.post('/:idUsuario/agregar', async (req, res) => {
	// Implementa la lógica para agregar un producto al carrito de un usuario
	const id = req.params.idUsuario;
	const producto = req.body;
	const carrito = await agregarProductoAlCarrito(id, producto);

	if (carrito === undefined) {
		return res.status(418).send('Soy una tetera');
	}
	return res.status(200).json(carrito);
});

carritoRouter.delete('/:idUsuario/eliminar/:idProducto', async (req, res) => {
	// Implementa la lógica para eliminar un producto del carrito de un usuario
	const id = req.params.idUsuario;
	const producto = req.body;
	const carrito = await eliminarProductoAlCarrito(id, producto);

	if (carrito === undefined) {
		return res.status(418).send('Soy una tetera');
	}
	return res.status(200).json(carrito);
});

carritoRouter.put('/:idUsuario/modificar/:idProducto', async (req, res) => {
	// Implementa la lógica para modificar un producto en el carrito de un usuario
});

module.exports = { carritoRouter };
