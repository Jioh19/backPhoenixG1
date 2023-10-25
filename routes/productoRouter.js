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
let listaProducts = [];

const URL = 'https://fakestoreapi.com/products';

const loader = async () => {
	try {
		const productsJson = fs.readFileSync('./DB/products.json');
		if (productsJson == '') {
			throw new Error('Empty');
		}
		listaProducts = await JSON.parse(productsJson);
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
				})
				.catch((err) => res.send(err));
		}
	}
};

productoRouter.post('/', async (req, res) => {
	// Implementa la lógica para crear un producto
	if (listaProducts.length === 0) {
		await loader();
	}
	const body = req.body;
	console.log(body);
	const product = {
		...body,
		id: Number(listaProducts[listaProducts.length - 1].id) + 1,
	};
	listaProducts.push(product);
	fs.writeFileSync(
		'./DB/products.json',
		JSON.stringify(listaProducts, null, 2)
	);
	return res.status(201).json(product);
});

productoRouter.get('/:id', async (req, res) => {
	// Implementa la lógica para obtener el detalle de un producto
	if (listaProducts.length === 0) {
		await loader();
	}

	const id = req.params.id;
	const product = listaProducts.filter((prod) => prod.id == id);
	if (product == '') {
		return res.status(404).json();
	}
	return res.status(200).json(product);
});

productoRouter.get('/', async (req, res) => {
	// Implementa la lógica para obtener todos los productos
	try {
		const productsJson = fs.readFileSync('./DB/products.json');
		if (productsJson == '') {
			throw new Error('Empty');
		}
		listaProducts = JSON.parse(productsJson);

		return res.status(200).json(listaProducts);
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
					return res.status(200).json(listaProducts);
				})
				.catch((err) => res.send(err));
		}
	}
});

productoRouter.put('/:id', async (req, res) => {
	// Implementa la lógica para modificar un producto
	if (listaProducts.length === 0) {
		await loader();
	}

	const id = req.params.id;
	const body = req.body;
	const product = listaProducts.find((prod) => prod.id == id);
	const index = listaProducts.findIndex((prod) => prod.id == id);
	console.log(index);
	body.id = product.id;
	body.title ||= product.title;
	body.price ||= product.price;
	body.description ||= product.description;
	body.image ||= product.image;
	body.category ||= product.category;
	body.rating ||= product.rating;
	listaProducts[index] = body;
	console.log(body);
	if (product === undefined) {
		return res.status(404).json();
	}
	fs.writeFileSync(
		'./DB/products.json',
		JSON.stringify(listaProducts, null, 2)
	);
	return res.status(200).json(body);
});

productoRouter.delete('/:id', async (req, res) => {
	// Implementa la lógica para borrar un producto
	if (listaProducts.length === 0) {
		await loader();
	}

	const id = req.params.id;
	const product = listaProducts.filter((prod) => prod.id == id);
	listaProducts = listaProducts.filter((prod) => prod.id != id);

	if (product == '') {
		return res.status(404).json();
	}
	fs.writeFileSync(
		'./DB/products.json',
		JSON.stringify(listaProducts, null, 2)
	);
	return res.status(204).json(product);
});

module.exports = { productoRouter };
