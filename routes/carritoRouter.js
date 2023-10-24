const express = require("express");
const carritoRouter = express.Router();
const {
  obtenerCarrito,
  agregarProductoAlCarrito,
  eliminarProductoAlCarrito,
  modificarProductoAlCarrito,
} = require("../funciones");

carritoRouter.get("/:idUsuario", async (req, res) => {
  console.log("CARRITO");
  // Implementa la lógica para obtener el carrito de un usuario
});

carritoRouter.post("/:idUsuario/agregar", async (req, res) => {
  // Implementa la lógica para agregar un producto al carrito de un usuario
});

carritoRouter.delete("/:idUsuario/eliminar/:idProducto", async (req, res) => {
  // Implementa la lógica para eliminar un producto del carrito de un usuario
});

carritoRouter.put("/:idUsuario/modificar/:idProducto", async (req, res) => {
  // Implementa la lógica para modificar un producto en el carrito de un usuario
});

module.exports = { carritoRouter };
