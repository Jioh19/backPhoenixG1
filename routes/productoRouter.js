const express = require('express');
const productoRouter = express.Router();
const fs = require('fs');
const {
	crearProducto,
	obtenerDetalleProducto,
	obtenerProductos,
	modificarProducto,
	borrarProducto,
} = require('../funciones');

const URL = 'https://fakestoreapi.com/products';

productoRouter.post('/', async (req, res) => {
	// Implementa la lógica para crear un producto
});

productoRouter.get('/:id', async (req, res) => {
	// Implementa la lógica para obtener el detalle de un producto
});

productoRouter.get('/', async (req, res) => {
	console.log('PRODUCTO');
	try {
		const productsJson = fs.readFileSync('./DB/products.json');
		if (productsJson == '') {
			throw new Error('Empty');
		}
	} catch (error) {
		if (error.code === 'ENOENT' || error.message === 'Empty') {
			fetch(URL)
				.then((res) => res.json())
				.then((json) => {
					listaProducts = json;
					fs.writeFileSync(
						'./DB/products.json',
						JSON.stringify(listaProducts, null, 2)
					);
					return listaProducts;
				})
				.catch((error) => alert(error.message));
		}
	}
	// Implementa la lógica para obtener todos los productos
});

productoRouter.put('/:id', async (req, res) => {
	// Implementa la lógica para modificar un producto
});

productoRouter.delete('/:id', async (req, res) => {
	// Implementa la lógica para borrar un producto
});

module.exports = { productoRouter };
