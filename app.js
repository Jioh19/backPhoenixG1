const express = require("express");
const bodyParser = require("body-parser");
const { authRouter } = require("./routes/authRouter");
const { usuarioRouter } = require("./routes/usuarioRouter");
const { productoRouter } = require("./routes/productoRouter");
const { carritoRouter } = require("./routes/carritoRouter");
const app = express();

const PORT = 8080;

//AYUDA A QUE EL SERVIDOR ACEPTE PETICIONES POST
app.use(express.json());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/producto", productoRouter);
app.use("/usuario", usuarioRouter);
app.use("/carrito", carritoRouter);

app.listen(PORT, () => {
  //LLAMADO A LA API https://fakestoreapi.com/products
  console.log("conectado en el puerto: " + PORT);
});
