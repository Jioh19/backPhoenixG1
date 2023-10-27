const express = require('express');
const productoRouter = express.Router();
const fs = require('fs');
const verifyToken = require('../middleware/verifyToken');
const {
	crearProducto,
	obtenerDetalleProducto,
	obtenerProductos,
	modificarProducto,
	borrarProducto,
} = require('../funciones');
let listaProducts = [];

const URL = 'https://fakestoreapi.com/products';

productoRouter.post('/', async (req, res) => {
	// Implementa la lógica para crear un producto
	const body = req.body;
	const { title, price, description, category, image } = body;
	console.log(body);
	if (!(title && price && description && category && image)) {
		console.log('entro');
		return res.status(400).send('Todos los datos son requeridos');
	}

	const producto = await crearProducto(req.body);
	if (producto.code == 201) {
		return res.status(201).json(producto.producto);
	} else return res.status(400).message(producto.message);
});

productoRouter.get('/:id', async (req, res) => {
	// Implementa la lógica para obtener el detalle de un producto

	const id = req.params.id;
	const product = await obtenerDetalleProducto(id);

	if (product.code === 200) {
		return res.status(product.code).json(product.product);
	}
	return res.status(product.code).send(product.message);
});

productoRouter.get('/', async (req, res) => {
	// Implementa la lógica para obtener todos los productos

	const productos = await obtenerProductos(req.body);
	if (productos.code === 200) {
		return res.status(200).json(productos.productos);
	} else return res.status(400).send(productos.message);
});

productoRouter.put('/:id', async (req, res) => {
	// Implementa la lógica para modificar un producto

	const id = req.params.id;
	const body = req.body;

	const producto = await modificarProducto(id, body);

	if (producto.code === 200) {
		return res.status(200).json(producto.product);
	}
	return res.status(producto.code).send(producto.message);
});

productoRouter.delete('/:id', async (req, res) => {
	// Implementa la lógica para borrar un producto

	const id = req.params.id;
	const producto = await borrarProducto(id);

	return res.status(producto.code).send(producto.message);
});

module.exports = { productoRouter };
