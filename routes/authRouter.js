const express = require("express");
const authRouter = express.Router();
const { register, login } = require("../funciones");

authRouter.post("/register", async (req, res) => {
  // Implementa la lógica para el registro
});

authRouter.post("/login", async (req, res) => {
  console.log("LOGIN");
  // Implementa la lógica para el inicio de sesión
});

module.exports = { authRouter };
