import { Router } from "express";
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/usuariosController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, obtenerUsuarios);

router.post("/", authMiddleware, crearUsuario);

router.put("/:id", authMiddleware, actualizarUsuario);

router.delete("/:id", authMiddleware, eliminarUsuario);

export default router;
