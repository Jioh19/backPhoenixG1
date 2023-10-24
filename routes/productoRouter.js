const express = require("express");
const productoRouter = express.Router();
const {
  crearProducto,
  obtenerDetalleProducto,
  obtenerProductos,
  modificarProducto,
  borrarProducto,
} = require("../funciones");

productoRouter.post("/", async (req, res) => {
  // Implementa la lógica para crear un producto
});

productoRouter.get("/:id", async (req, res) => {
  // Implementa la lógica para obtener el detalle de un producto
});

productoRouter.get("/", async (req, res) => {
  console.log("PRODUCTO");
  // Implementa la lógica para obtener todos los productos
});

productoRouter.put("/:id", async (req, res) => {
  // Implementa la lógica para modificar un producto
});

productoRouter.delete("/:id", async (req, res) => {
  // Implementa la lógica para borrar un producto
});

module.exports = { productoRouter };
