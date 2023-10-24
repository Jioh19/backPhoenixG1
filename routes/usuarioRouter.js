const express = require("express");
const usuarioRouter = express.Router();
const {
  obtenerUsuarios,
  obtenerUsuario,
  modificarUsuario,
  eliminarUsuario,
} = require("../funciones");

usuarioRouter.get("/", async (req, res) => {
  console.log("USUARIO");
  // Implementa la lógica para obtener todos los usuarios
});

usuarioRouter.get("/:id", async (req, res) => {
  // Implementa la lógica para obtener un usuario por ID
});

usuarioRouter.put("/:id", async (req, res) => {
  // Implementa la lógica para modificar un usuario
});

usuarioRouter.delete("/:id", async (req, res) => {
  // Implementa la lógica para eliminar un usuario
});

module.exports = { usuarioRouter };
