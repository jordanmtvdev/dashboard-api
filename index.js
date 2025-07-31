import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import usuarioRoutes from "./routes/usuarios.js";
import authRoutes from "./routes/auth.routes.js";

import productoRoutes from "./routes/producto.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/productos", productoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`Conectado a MongoDB Atlas`))
  .catch((err) => console.error("Error de conexion: ", err));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo un http://localhost:${process.env.PORT}`);
});
