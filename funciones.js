const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//AUTH
parseJwt = function (token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(atob(base64));
};

async function register(dataRegistro) {
	try {
		const usuarios = await JSON.parse(fs.readFileSync('./DB/users.json'));
		let id;
		if (usuarios.length === 0) {
			id = 0;
		} else {
			id = Number(usuarios[usuarios.length - 1].id) + 1;
		}
		const usuario = { ...dataRegistro, id: id };

		const encryptedPassword = await bcrypt.hash(usuario.password, 10);
		usuario.password = encryptedPassword;
		usuarios.push(usuario);
		// Creación del Token
		const token = jwt.sign(
			{
				id: usuario.id,
				email: usuario.email,
			},
			'Clave secreta!!!',
			{
				expiresIn: '30m',
			}
		);
		// Token Generado
		console.log('\nToken Generado: ' + token);

		fs.writeFileSync('./DB/users.json', JSON.stringify(usuarios, null, 2));
		return usuario;
	} catch (error) {
		console.log(error.message);
		return;
	}
}
async function login(username, password) {
	try {
		const usuarios = await JSON.parse(fs.readFileSync('./DB/users.json'));
		const usuario = await usuarios.find((user) => user.username == username);
		if (usuario == undefined) {
			return {
				code: 401,
				message: 'Nombre de Usuario o Password incorrectos',
			};
		}
		const check = await bcrypt.compare(password, usuario.password);
		if (!check) {
			return {
				code: 401,
				message: 'Nombre de Usuario o Password incorrectos',
			};
		}
		const token = jwt.sign(
			{
				id: usuario.id,
				email: usuario.email,
			},
			'Clave secreta!!!',
			{
				expiresIn: '30m',
			}
		);
		// Impresión por el terminal del Token generado para el usuario
		console.log('Usuario: ' + usuario.email + '\nToken: ' + token);
		return {
			code: 200,
			token: token,
			message: 'Usuario autenticado',
		};
	} catch (error) {
		console.log(error.message);
		return;
	}
}

//PRODUCTOS
async function crearProducto(product) {
	try {
		const productos = await JSON.parse(fs.readFileSync('./DB/products.json'));
		let id;
		if (productos.length === 0) {
			id = 0;
		} else {
			id = Number(productos[productos.length - 1].id) + 1;
		}
		const producto = { ...product, id: id };

		productos.push(producto);

		fs.writeFileSync('./DB/products.json', JSON.stringify(productos, null, 2));
		return {
			code: 201,
			producto,
		};
	} catch (error) {
		console.log(error.message);
		return {
			code: 400,
			message: error.message,
		};
	}
}
async function obtenerDetalleProducto(id) {
	const productos = await JSON.parse(fs.readFileSync('./DB/products.json'));
	const product = productos.filter((prod) => prod.id == id);

	if (product.length === 0) {
		return {
			code: 404,
			message: `Product id ${id} not found`,
		};
	}
	return {
		code: 200,
		product,
	};
}
async function obtenerProductos() {
	try {
		const productos = await JSON.parse(fs.readFileSync('./DB/products.json'));
		if (productos.length === 0) {
			throw new Error('Empty');
		}
		return {
			code: 200,
			productos,
		};
	} catch (error) {
		if (error.code === 'ENOENT' || error.message === 'Empty') {
			try {
				const data = await fetch('https://fakestoreapi.com/products');
				const productos = await data.json();
				fs.writeFileSync(
					'./DB/products.json',
					JSON.stringify(productos, null, 2)
				);
				return {
					code: 200,
					productos,
				};
			} catch (error) {
				return {
					code: 400,
					message: error.message,
				};
			}
		}
	}
}

async function modificarProducto(id, product) {
	try {
		const productos = await JSON.parse(fs.readFileSync('./DB/products.json'));
		const index = productos.findIndex((prod) => prod.id == id);
		if (index === -1) {
			return {
				code: 404,
				message: `Producto id ${id} not found.`,
			};
		}
		console.log(product);
		product.id = productos[index].id;
		product.title ||= productos[index].title;
		product.price ||= productos[index].price;
		product.description ||= productos[index].description;
		product.image ||= productos[index].image;
		product.category ||= productos[index].category;
		product.rating ||= productos[index].rating;
		console.log(product);
		productos[index] = product;
		fs.writeFileSync('./DB/products.json', JSON.stringify(productos, null, 2));
		return {
			code: 200,
			product,
		};
	} catch (error) {
		return {
			code: 400,
			message: error.message,
		};
	}
}

async function borrarProducto(id) {
	try {
		let productos = await JSON.parse(fs.readFileSync('./DB/products.json'));
		const producto = productos.find((prod) => prod.id == id);
		if (producto == undefined) {
			return {
				code: 404,
				message: `Producto id ${id} not found.`,
			};
		}
		productos = productos.filter((prod) => prod.id != id);
		fs.writeFileSync('./DB/products.json', JSON.stringify(productos, null, 2));
		return {
			code: 204,
			message: `Product id ${id} deleted`,
		};
	} catch (error) {
		return {
			code: 404,
			message: error.message,
		};
	}
}

//USUARIO
async function obtenerUsuarios() {
	try {
		const usuarios = await JSON.parse(fs.readFileSync('./DB/users.json'));
		return usuarios;
	} catch (error) {
		console.log(error.message);
		return;
	}
}

async function obtenerUsuario(id) {
	try {
		const usuarios = await JSON.parse(fs.readFileSync('./DB/users.json'));
		const usuario = usuarios.find((user) => user.id == id);
		return usuario;
	} catch (error) {
		console.log(error.message);
		return;
	}
}
async function modificarUsuario(id, user) {
	try {
		const usuarios = await JSON.parse(fs.readFileSync('./DB/users.json'));
		const index = usuarios.findIndex((usuario) => usuario.id == id);
		console.log(id, user, index);
		user.id = usuarios[index].id;
		user.email ||= usuarios[index].email;
		user.username ||= usuarios[index].username;
		user.firstName ||= usuarios[index].firstName;
		user.lastName ||= usuarios[index].lastName;
		user.city ||= usuarios[index].city;
		user.street ||= usuarios[index].street;
		user.number ||= usuarios[index].number;
		user.zipcode ||= usuarios[index].zipcode;
		user.password ||= usuarios[index].password;
		usuarios[index] = user;

		fs.writeFileSync('./DB/users.json', JSON.stringify(usuarios, null, 2));
		return user;
	} catch (error) {
		console.log(error.message);
		return;
	}
}
async function eliminarUsuario(id) {
	try {
		let usuarios = await JSON.parse(fs.readFileSync('./DB/users.json'));
		const usuario = usuarios.find((usuario) => usuario.id == id);
		usuarios = usuarios.filter((usuario) => usuario.id != id);

		fs.writeFileSync('./DB/users.json', JSON.stringify(usuarios, null, 2));
		return usuario;
	} catch (error) {
		console.log(error.message);
		return;
	}
}

//USUARIO - CARRITO

async function obtenerCarrito(token) {
	const idUsuario = parseJwt(token).id;
	console.log(idUsuario);
	try {
		const carritos = await JSON.parse(fs.readFileSync('./DB/carts.json'));
		let carrito = await carritos.find((cart) => cart.id == idUsuario);
		if (carrito == undefined) {
			carrito = {
				id: idUsuario,
				productos: [],
			};
			carritos.push(carrito);
		}
		fs.writeFileSync('./DB/carts.json', JSON.stringify(carritos, null, 2));
		return carrito;
	} catch (error) {
		console.log(error.message);
		return;
	}
}
async function agregarProductoAlCarrito(token, producto) {
	const idUsuario = parseJwt(token).id;
	console.log(idUsuario);
	try {
		const carritos = await JSON.parse(fs.readFileSync('./DB/carts.json'));
		let carrito = await carritos.find((cart) => cart.id == idUsuario);
		if (carrito == undefined) {
			carrito = {
				id: idUsuario,
				productos: [],
			};
			carritos.push(carrito);
		}
		carrito.productos.push(producto);
		fs.writeFileSync('./DB/carts.json', JSON.stringify(carritos, null, 2));
		return carrito;
	} catch (error) {
		console.log(error.message);
		return;
	}
}

async function eliminarProductoAlCarrito(token, idProducto) {
	const idUsuario = parseJwt(token).id;
	console.log(idUsuario, idProducto);
	try {
		const carritos = await JSON.parse(fs.readFileSync('./DB/carts.json'));
		console.log(carritos);
		let carrito = await carritos.find((cart) => cart.id == idUsuario);
		console.log('funcion delete: carrito', carrito);
		carrito.productos = carrito.productos.filter(
			(prod) => prod.idCart != idProducto
		);

		fs.writeFileSync('./DB/carts.json', JSON.stringify(carritos, null, 2));
		return carrito;
	} catch (error) {
		console.log(error.message);
		return;
	}
}
async function modificarProductoAlCarrito(idUsuario, idProducto) {}

module.exports = {
	register,
	login,
	crearProducto,
	obtenerDetalleProducto,
	obtenerProductos,
	modificarProducto,
	borrarProducto,
	obtenerCarrito,
	agregarProductoAlCarrito,
	eliminarProductoAlCarrito,
	modificarProductoAlCarrito,
	obtenerUsuarios,
	obtenerUsuario,
	modificarUsuario,
	eliminarUsuario,
};
