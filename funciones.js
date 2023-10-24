const fs = require("fs");

//AUTH
async function register(dataRegistro) {}
async function login(user, password) {}

//PRODUCTOS
async function crearProducto(product) {}
async function obtenerDetalleProducto(id) {}
async function obtenerProductos() {}
async function modificarProducto(id) {}
async function borrarProducto(id) {}

//USUARIO
async function obtenerUsuarios() {}
async function obtenerUsuario(id) {}
async function modificarUsuario(id) {}
async function eliminarUsuario(id) {}

//USUARIO - CARRITO
async function obtenerCarrito(idUsuario) {}
async function agregarProductoAlCarrito(idUsuario, producto) {}
async function eliminarProductoAlCarrito(idUsuario, idProducto) {}
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
